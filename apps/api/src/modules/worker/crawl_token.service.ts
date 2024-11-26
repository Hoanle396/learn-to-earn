const pLimit = require('p-limit');
import { getLogger } from 'src/utils/logger';
import type { DataSource } from 'typeorm';

const logger = getLogger('CrawlTokenService');

enum EventType {
  TRANSFER = 'Transfer',
}

const BATCH_SIZE = 100; // Event group size for parallel processing
const BATCH_LIMIT = 20;
const limit = pLimit(BATCH_LIMIT);

export class CrawlTokenService {
  constructor(private dataSource: DataSource) {
    this.init().catch((error) => {
      logger.error('Init Crawl Token Worker Error: ');
      logger.error(error);
    });
  }

  async init() { }
}
