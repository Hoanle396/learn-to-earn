import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class LearnDto {
  @ApiProperty({ required: true })
  @Min(0)
  @Max(100)
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  percent: number;
}
