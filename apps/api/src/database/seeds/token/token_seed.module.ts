import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenSeedService } from './token_seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [TokenSeedService],
  exports: [TokenSeedService],
})
export class TokenSeedModule { }
