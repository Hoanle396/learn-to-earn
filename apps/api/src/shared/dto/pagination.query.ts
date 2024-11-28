import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryPaginationDto {
  @ApiProperty({
    required: false,
    type: Number,
    description: 'Limit for pagination',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  limit?: number = 10;

  @ApiProperty({
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page?: number = 1;
}
