import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);

  @Cron('* * * * *')
  handleCron() {
    this.logger.debug('Call at every minute.');
  }
}
