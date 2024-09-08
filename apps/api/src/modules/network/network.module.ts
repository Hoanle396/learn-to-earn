import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Network } from 'src/database/entities';

import { NetworkController } from './network.controller';
import { NetworkService } from './network.service';

@Module({
  imports: [TypeOrmModule.forFeature([Network])],
  providers: [NetworkService],
  controllers: [NetworkController],
})
export class NetworkModule {}
