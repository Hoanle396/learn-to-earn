import { Injectable } from '@nestjs/common';
import type { ScheduledTask } from 'node-cron';
import cron from 'node-cron';
import { getLogger } from 'src/utils/logger';
import { DataSource } from 'typeorm';

import { TokenPriceService } from '../services/token_price.service';
import type { CrawlTokenService } from './crawl_token.service';
import type { CrawlTokenPriceService } from './crawl_token_price.service';

const logger = getLogger('ManagerService');

@Injectable()
export class ManagerService {
  private crawlTokenServices: CrawlTokenService[] = [];
  private crawlTokenPriceServices: CrawlTokenPriceService[] = [];
  private cronJob: ScheduledTask;

  constructor(
    private readonly dataSource: DataSource,
    private readonly tokenPriceService: TokenPriceService,
  ) {
    this.init();
    this.startCronJob();
  }

  // Every hour
  startCronJob() {
    this.cronJob = cron.schedule('0 0 * * * *', async () => {
      await this.init(); // Synchronize with database
    });
  }

  async init() {
    await this.initNetworkToken();
  }

  private async initNetworkToken() { }

  private runWorker(_callback: () => void): void {
    try {
      _callback();
    } catch (error) {
      logger.error(error);
    }
  }

  private stopCronJob() {
    if (this.cronJob) {
      this.cronJob.stop();
      logger.info('Cron job stopped.');
    }
  }
}
