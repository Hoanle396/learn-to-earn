import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '@/databases/entities';
import { TokenSeedService } from './token_seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [TokenSeedService],
  exports: [TokenSeedService],
})
export class TokenSeedModule {}
