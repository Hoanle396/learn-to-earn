import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PoolCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  tags: string[];

  @ApiProperty()
  @IsString()
  logo: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  questionPerPool: number;
}

export class CreateQuestionDto {
  @ApiProperty()
  @IsNumber()
  poolId: number;

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file: Express.Multer.File;
}
