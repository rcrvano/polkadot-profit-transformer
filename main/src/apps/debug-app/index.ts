import { IdentityProcessor } from './../../modules/identity-processor/index'
import { ExtrinsicsProcessor } from '../../modules/streamer/extrinsics-processor'
import { EventsProcessor } from '../../modules/streamer/events-processor'
import { BlockProcessor } from '../../modules/streamer/block-processor'
import knex from 'knex'

import { environment } from './environment'
import { polkadotFactory } from '../common/infra/polkadotapi/index'
import { LoggerFactory as PinoLogger } from '../common/infra/logger/logger'
import { EventBus } from 'utils/event-bus/event-bus'

import { PolkadotRepository } from './../common/infra/polkadotapi/polkadot.repository'
import { IdentityRepository } from './../common/infra/postgresql/identity.repository'
import { StakingRepository } from './../common/infra/postgresql/staking.repository'
import { StreamerRepository } from './../common/infra/postgresql/streamer.repository'
import { GovernanceRepository } from '../common/infra/postgresql/governance.repository'

import { ExtrinsicProcessor } from '../../modules/governance-processor/processors/extrinsics'
import { GovernanceProcessor } from '../../modules/governance-processor'
import { EventProcessor } from '@modules/governance-processor/processors/events'
import { StakingProcessor } from '@modules/staking-processor'

const main = async () => {
  const logger = PinoLogger({ logLevel: environment.LOG_LEVEL! })

  const pg = knex({
    client: 'pg',
    debug: false,
    connection: {
      connectionString: environment.PG_CONNECTION_STRING,
      ssl: false,
    },
    searchPath: ['knex', environment.DB_SCHEMA!],
  })

  const polkadotApi = await polkadotFactory(environment.SUBSTRATE_URI!)
  const eventBus = EventBus({ logger })

  const streamerRepository = StreamerRepository({ knex: pg, logger })
  const stakingRepository = StakingRepository({ knex: pg, logger })
  const identityRepository = IdentityRepository({ knex: pg, logger })
  const governanceRepository = GovernanceRepository({ knex: pg, logger })
  const polkadotRepository = PolkadotRepository({ polkadotApi, logger })

  // old governance modules
  const extrinsicProcessor = ExtrinsicProcessor({ governanceRepository, logger, polkadotApi })
  const eventProcessor = EventProcessor({ governanceRepository, logger, polkadotApi })
  const governanceProcessor = GovernanceProcessor({ extrinsicProcessor, eventProcessor, logger })

  const eventsProcessor = EventsProcessor({ logger })
  const extrinsicsProcessor = ExtrinsicsProcessor({ polkadotRepository })
  const blockProcessor = BlockProcessor({
    polkadotRepository,
    eventsProcessor,
    extrinsicsProcessor,
    logger,
    eventBus,
    streamerRepository,
  })
  const stakingProcessor = StakingProcessor({ polkadotRepository, streamerRepository, stakingRepository, logger })
  const identityProcessor = IdentityProcessor({ polkadotRepository, identityRepository, logger })

  // todo fix generics to register and dispatch in eventBus
  eventBus.register('eraPayout', stakingProcessor.addToQueue)
  eventBus.register('identityEvent', identityProcessor.processEvent)
  eventBus.register('identityExtrinsic', identityProcessor.processIdentityExtrinsics)
  eventBus.register('subIdentityExtrinsic', identityProcessor.processSubIdentityExtrinsics)
  eventBus.register('governanceExtrinsic', governanceProcessor.processExtrinsicsHandler)
  eventBus.register('governanceEvent', governanceProcessor.processEventHandler)

  const targetExtrinsicsSectionsMethods = {
    technicalCommittee: ['propose', 'vote'],
    // democracy: ['vote', 'propose', 'second', 'removeVote', 'removeOtherVote', 'notePreimage'],
    // council: ['propose', 'vote'],
    // treasury: ['proposeSpend', 'reportAwesome', 'tip'],
    // tips: ['tipNew', 'tip'],
    // proxy: ['proxy'],
    // multisig: ['asMulti'],
  }

  const targetEventsSectionsMethods = {
    technicalCommittee: ['Approved', 'Executed', 'Closed', 'Disapproved', 'MemberExecuted'],
    // democracy: ['Started', 'Tabled', 'Cancelled', 'Executed', 'NotPassed', 'Passed', 'PreimageUsed'],
    // council: ['Approved', 'Executed', 'Closed', 'Disapproved', 'MemberExecuted'],
    // treasury: ['Rejected', 'Awarded', 'TipClosed'],
    // tips: ['TipClosed'],
  }

  // get all target extrinsics
  const targetExtrinsicsMethodSections = Object.entries(targetExtrinsicsSectionsMethods).reduce((acc, [section, methods]) => {
    const extrinsics = methods.reduce((acc, method) => {
      acc.push({ section, method })
      return acc
    }, [] as { section: string; method: string }[])
    acc = [...acc, ...extrinsics]
    return acc
  }, [] as { section: string; method: string }[])

  // console.log(targetExtrinsicsMethodSections)

  const targetExtrinsics = await streamerRepository.extrinsics.findBySectionAndMethod(targetExtrinsicsMethodSections)

  // console.log('extr', targetExtrinsics)

  // get all target events
  const targetEventsMethodSections = Object.entries(targetEventsSectionsMethods).reduce((acc, [section, methods]) => {
    const events = methods.reduce((acc, method) => {
      acc.push({ section, method })
      return acc
    }, [] as { section: string; method: string }[])
    acc = [...acc, ...events]
    return acc
  }, [] as { section: string; method: string }[])

  // console.log(targetExtrinsicsMethodSections)

  const targetEvents = await streamerRepository.events.findBySectionAndMethod(targetEventsMethodSections)
  // console.log('evts', targetEvents)

  const reducedBlockIds = [...targetExtrinsics, ...targetEvents]
    .reduce((acc, extrinsic) => {
      if (acc.includes(extrinsic.block_id)) return acc
      return [...acc, extrinsic.block_id]
    }, [] as number[])
    .map((id) => +id)
    .sort((a, b) => a - b)

  console.log(reducedBlockIds.length)

  const chunks = []
  const chunk = 1000

  for (let i = 0, j = reducedBlockIds.length; i < j; i += chunk) {
    chunks.push(reducedBlockIds.slice(i, i + chunk))
  }

  reducedBlockIds.map((id, index) => console.log(index, id))

  let index = 0
  while (index < reducedBlockIds.length) {
    const blockId = reducedBlockIds[index]

    console.log(index, blockId)

    try {
      await blockProcessor(blockId)
    } catch (error: any) {
      console.log('Error in debug loop: ' + error.message)
      throw error
    }

    index++
  }
}

main()