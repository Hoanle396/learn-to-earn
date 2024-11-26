import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LatestBlock } from 'src/database/entities';

import { ServicesModule } from '../services/services.module';
import { ManagerService } from './manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([LatestBlock]), ServicesModule],
  providers: [ManagerService],
})
export class WorkerModule { }
