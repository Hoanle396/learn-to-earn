import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @Min(1)
  categoryId: number;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  logo: string;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: true })
  @IsArray({ each: true })
  @IsString({ each: true })
  @MinLength(1)
  tags: string[];
}
