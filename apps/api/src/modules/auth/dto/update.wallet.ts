import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { IsAddress } from '@/common/decorators/is_address.decorator';

export class UpdateWalletDto {
  @ApiProperty({ minLength: 6, required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsAddress()
  wallet: string;
}
