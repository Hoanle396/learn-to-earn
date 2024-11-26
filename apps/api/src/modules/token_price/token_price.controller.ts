import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TokenPriceService } from './token_price.service';

@ApiTags('token-price')
@Controller('token-price')
export class TokenPriceController {
  constructor(private readonly tokenPriceService: TokenPriceService) { }
}
