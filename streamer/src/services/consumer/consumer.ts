import { IConsumerService } from './consumer.types'
import { IBlocksService, BlocksService } from '../blocks'
import { Header } from '@polkadot/types/interfaces'
import { PolkadotModule } from '../../modules/polkadot.module'
import { ILoggerModule, LoggerModule } from '../../modules/logger.module'
import { BlockRepository } from '../../repositories/block.repository'

/**
 * Provides blocks streamer service
 * @class
 */
class ConsumerService implements IConsumerService {
  private readonly blockRepository: BlockRepository = BlockRepository.inject()
  private readonly polkadotApi: PolkadotModule = PolkadotModule.inject()
  private readonly logger: ILoggerModule = LoggerModule.inject()
  /**
   * Subscribe to finalized heads stream
   *
   * @async
   * @returns {Promise<void>}
   */
  async subscribeFinalizedHeads(): Promise<void> {
    if (!BlocksService.isSyncComplete()) {
      this.logger.error(`failed setup "subscribeFinalizedHeads": sync in process`)
      return
    }

    this.logger.info(`Starting subscribeFinalizedHeads`)

    const blockNumberFromDB = await this.blockRepository.getLastProcessedBlock()

    if (blockNumberFromDB === 0) {
      this.logger.warn(`"subscribeFinalizedHeads" capture enabled but, not synchronized blocks `)
    }

    await this.polkadotApi.subscribeFinalizedHeads((header) => {
      return this.onFinalizedHead(header)
    })
  }

  /**
   * Finalized headers capture handler
   *
   * @async
   * @private
   * @param {BlockHash} blockHash
   * @returns {Promise<void>}
   */
  private async onFinalizedHead(blockHash: Header): Promise<void> {
    const blocksService: IBlocksService = new BlocksService()

    const blockNumberFromDB = await this.blockRepository.getLastProcessedBlock()

    console.log('blockHash.number.toNumber()', blockHash.number.toNumber())
    console.log('blockNumberFromDB', blockNumberFromDB)
    if (blockHash.number.toNumber() === blockNumberFromDB) {
      return
    }

    this.logger.info(`Captured block "${blockHash.number}" with hash ${blockHash.hash}`)

    if (blockHash.number.toNumber() < blockNumberFromDB) {
      this.logger.info(`stash operation detected`)
      await blocksService.trimAndUpdateToFinalized(blockHash.number.toNumber())
    }

    try {
      await blocksService.processBlock(blockHash.number.toNumber(), false)
    } catch (error) {
      this.logger.error(`failed to process captured block #${blockHash}:`, error)
    }
  }
}

export { ConsumerService }
