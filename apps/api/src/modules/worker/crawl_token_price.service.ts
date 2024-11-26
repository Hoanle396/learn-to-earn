import type { ScheduledTask } from 'node-cron';
import cron from 'node-cron';
import { getLogger } from 'src/utils/logger';
import type { DataSource } from 'typeorm';

import type { TokenPriceService } from '../services/token_price.service';

const logger = getLogger('CrawlTokenPriceService');

export class CrawlTokenPriceService {
  private cronTask: ScheduledTask;
  constructor(
    private dataSource: DataSource,
    private tokenPriceService: TokenPriceService,
  ) {
    this.init();
  }

  async init() {
    this.handleCron();
  }

  // Every minute
  handleCron() {
    this.cronTask = cron.schedule('* * * * *', async () => { });
  }

  stop() {
    if (this.cronTask) {
      this.cronTask.stop();
      logger.info('Crawl Token Price Worker stopped.');
    }
  }
}
