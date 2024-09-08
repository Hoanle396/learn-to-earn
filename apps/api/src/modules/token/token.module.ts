import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/database/entities';

import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
