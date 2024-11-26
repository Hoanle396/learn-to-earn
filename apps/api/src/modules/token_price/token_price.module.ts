import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenPriceController } from './token_price.controller';
import { TokenPriceService } from './token_price.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [TokenPriceService],
  controllers: [TokenPriceController],
  exports: [TokenPriceService],
})
export class TokenPriceModule { }
