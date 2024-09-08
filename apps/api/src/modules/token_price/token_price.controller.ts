import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { TokenPrice } from 'src/database/entities';
import { QueryPaginationDto } from 'src/shared/dto/pagination.query';
import type { FetchResult } from 'src/utils/paginate';

import { QueryTokenPriceDto } from './dto/token_price.query';
import { TokenPriceService } from './token_price.service';

@ApiTags('token-price')
@Controller('token-price')
export class TokenPriceController {
  constructor(private readonly tokenPriceService: TokenPriceService) {}

  @Get('')
  async getItemsByPagination(
    @Query() query?: QueryTokenPriceDto,
    @Query() pagination?: QueryPaginationDto,
  ): Promise<FetchResult<TokenPrice>> {
    return await this.tokenPriceService.getItemsByPagination(query, pagination);
  }
}
