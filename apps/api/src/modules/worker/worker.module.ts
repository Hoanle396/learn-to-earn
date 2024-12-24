import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LatestBlock } from '@/databases/entities';
import { WorkerService } from './worker.service';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([LatestBlock])],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
