import { create } from 'zustand';
import { polygonAmoy } from 'viem/chains';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { createPublicClient, decodeEventLog, http, HttpTransport, PublicClient } from 'viem';
import { ConfigService } from '@nestjs/config';
import { ABI } from '@/shared/abi';
import { InjectRepository } from '@nestjs/typeorm';
import { LatestBlock, RankingPool } from '@/databases/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WorkerService {
  private client: ReturnType<typeof this.createClient>;
  private readonly logger = new Logger(WorkerService.name);
  constructor(
    private configService: ConfigService,
    @InjectRepository(LatestBlock) private latestBlockRepository: Repository<LatestBlock>,
    private dataSource: DataSource
  ) {
    this.client = this.createClient();
  }

  createClient() {
    return createPublicClient({
      chain: polygonAmoy,
      transport: http(),
    });
  }

  @Cron('*/10 * * * * *')
  async handleCron() {
    await this.handlePoolCreated();
  }

  async handlePoolCreated() {
    try {
      const latestBlock = await this.getLatestBlock();
      const onchainBlock = await this.client.getBlockNumber();
      console.log(onchainBlock);
      const logs = await this.client.getLogs({
        address: this.configService.get('contract.contractAddress', { infer: true }),
        fromBlock: BigInt(latestBlock.blockNumber),
        toBlock: onchainBlock,
      });

      if (!logs.length) {
        this.logger.debug('No logs found ' + this.configService.get('contract.contractAddress', { infer: true }));
      }
      for (const event of logs) {
        const log = decodeEventLog({
          abi: ABI,
          topics: (event as any).topics,
          data: event.data,
        });
        this.logger.debug(log);
        switch (log.eventName) {
          case 'PoolCreatedEvent':
            this.handleCreatedPool(log.args);
            break;
          case 'PoolClosed':
            this.logger.debug('PoolClosed');
            break;
          case 'PoolPassed':
            this.logger.debug('PoolPassed');
            break;
          default:
            this.logger.debug('Unknown event');
            break;
        }
      }
      await this.updateLatestBlock(Number(onchainBlock));
    } catch (error) {
      console.log(error);
    }
  }

  async handleCreatedPool(args: any) {
    this.logger.debug(args);
    const pool = await this.dataSource.manager
      .createQueryBuilder(RankingPool, 'ranking_pool')
      .where('ranking_pool.name=:name', { name: args.name })
      .getOne();
    if (pool) {
      pool.isVerified = true;
      pool.onchainId = args.id;
      await this.dataSource.manager.save(pool);
      this.logger.debug('Pool updated');
    }
  }

  async updateLatestBlock(blocknumber: number) {
    const crawlKey = `crawl_pol_${this.configService.get('contract.contractAddress', { infer: true })}`;
    return await this.latestBlockRepository
      .createQueryBuilder('latest_block')
      .update(LatestBlock)
      .set({ blockNumber: blocknumber })
      .where('crawlKey = :crawlKey', { crawlKey })
      .execute();
  }

  async getLatestBlock() {
    const crawlKey = `crawl_pol_${this.configService.get('contract.contractAddress', { infer: true })}`;
    let latestBlock = await this.latestBlockRepository
      .createQueryBuilder('latest_block')
      .where('latest_block.crawlKey = :crawlKey', { crawlKey })
      .getOne();
    if (!latestBlock) {
      latestBlock = new LatestBlock();
      latestBlock.crawlKey = crawlKey;
      latestBlock.blockNumber = 16000719;
      latestBlock = await this.latestBlockRepository.save(latestBlock);
    }
    return latestBlock;
  }
}
