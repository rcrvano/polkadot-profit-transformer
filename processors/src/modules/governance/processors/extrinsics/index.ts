import { ApiPromise } from '@polkadot/api'
import { Extrinsic } from './../../types'
import { Logger } from 'apps/common/infra/logger/logger'
import { GovernanceRepository } from '../../../../apps/common/infra/postgresql/governance/governance.repository'
import { processDemocracyReferendaVoteExtrinsic } from './democracy/referenda'
import { processTechnicalCommiteeProposeExtrinsic } from './technicalCommitee'
import { processDemocracyProposalProposeExtrinsic } from './democracy/proposal'
import { processDemocracyProposalSecondExtrinsic } from './democracy/proposal/second'

export type ExtrinsicProcessor = ReturnType<typeof ExtrinsicProcessor>

export const ExtrinsicProcessor = (deps: { governanceRepository: GovernanceRepository; logger: Logger; polkadotApi: ApiPromise }) => {
  const { governanceRepository, logger, polkadotApi } = deps

  return {
    technicalCommitee: {
      propose: (extrinsic: Extrinsic) => processTechnicalCommiteeProposeExtrinsic(extrinsic, governanceRepository, logger),
    },
    democracy: {
      referenda: {
        vote: (extrinsic: Extrinsic) => processDemocracyReferendaVoteExtrinsic(extrinsic, governanceRepository, logger),
      },
      proposal: {
        propose: (extrinsic: Extrinsic) => processDemocracyProposalProposeExtrinsic(extrinsic, governanceRepository, logger, polkadotApi),
        second: (extrinsic: Extrinsic) => processDemocracyProposalSecondExtrinsic(extrinsic, governanceRepository, logger, polkadotApi),
      },
    },
  }
}
