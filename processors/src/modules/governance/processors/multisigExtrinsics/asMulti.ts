import { ApiPromise } from '@polkadot/api'
import { OpaqueCall } from '@polkadot/types/interfaces'
import { Logger } from 'apps/common/infra/logger/logger'
import { ExtrinsicProcessor } from '../extrinsics'
import { findExtrinic } from '../utils/findExtrinsic'
import { isExtrinsicSuccess } from '../utils/isExtrinsicSuccess'
import { Extrinsic } from './../../types'

export const processAsMultiExtrinsic = async (
  extrinsic: Extrinsic,
  logger: Logger,
  polkadotApi: ApiPromise,
  extrinsicProcessor: ExtrinsicProcessor,
) => {
  const blockHash = await polkadotApi.rpc.chain.getBlockHash(extrinsic.block_id)
  const blockEvents = await polkadotApi.query.system.events.at(blockHash)

  const isExtrinsicSuccessfull = await isExtrinsicSuccess(extrinsic, blockEvents, polkadotApi)
  if (!isExtrinsicSuccessfull) return

  const block = await polkadotApi.rpc.chain.getBlock(blockHash)

  const extrinsicFull = await findExtrinic(block, 'multisig', 'asMulti', polkadotApi)
  if (!extrinsicFull) throw Error('no full extrinsic for enrty ' + extrinsic.id)

  const call = <OpaqueCall>extrinsicFull.method.args[3]

  const methods = polkadotApi.registry.createType('Call', call.toU8a(true))

  const ext = methods.args[2] as any

  if (ext.section === 'technicalCommittee') {
    if (ext.method === 'propose') {
      const extrinsicEntry: Extrinsic = {
        id: extrinsic.id,
        block_id: extrinsic.block_id,
        section: ext.section,
        method: ext.method,
        signer: extrinsic.signer,
        extrinsic: {},
        args: {},
      }
      return extrinsicProcessor.technicalCommitee.propose(extrinsicEntry)
    }
  }
}