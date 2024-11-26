import { Injectable } from '@nestjs/common';
import { getLogger } from 'src/utils/logger';

@Injectable()
export class TokenSeedService {
  logger = getLogger(TokenSeedService.name);

  constructor() { }

  async bootstrap(): Promise<void> {
    this.logger.info(
      'The data seeding process for Token has been completed successfully!',
    );
  }
}
