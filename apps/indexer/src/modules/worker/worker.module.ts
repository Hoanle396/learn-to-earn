import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';

@Module({
  imports: [],
  providers: [WorkerService],
})
export class WorkerModule {}
