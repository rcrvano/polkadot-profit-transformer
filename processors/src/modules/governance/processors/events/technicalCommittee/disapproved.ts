import { GovernanceRepository } from '../../../../../apps/common/infra/postgresql/governance/governance.repository'
import { EventEntry } from '@modules/governance/types'
import { Logger } from 'apps/common/infra/logger/logger'
import { TechnicalCommiteeProposalModel } from 'apps/common/infra/postgresql/governance/models/technicalCommiteeModels'

export const processTechnicalCommitteeDisapprovedEvent = async (
  event: EventEntry,
  governanceRepository: GovernanceRepository,
  logger: Logger,
): Promise<void> => {
  logger.trace({ event }, 'process technical commitee disapproved event')

  const eventData = JSON.parse(event.data)

  const hash = eventData[0]['Hash']
  const proposal_id = await governanceRepository.technicalCommittee.findProposalIdByHash(hash)

  const proposal: TechnicalCommiteeProposalModel = {
    hash,
    id: proposal_id,
    block_id: event.block_id,
    extrinsic_id: '',
    event: 'Disapproved',
    data: {},
  }

  await governanceRepository.technicalCommittee.save(proposal)
}