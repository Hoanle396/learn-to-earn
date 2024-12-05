import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option, Quiz, RankingPool, UserQuiz } from '@/databases/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Option, RankingPool, UserQuiz])],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
