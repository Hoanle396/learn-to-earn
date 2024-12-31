import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option, Quiz, RankingPool, Prize, Certification } from '@/databases/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Option, RankingPool, Prize, Certification])],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule { }
