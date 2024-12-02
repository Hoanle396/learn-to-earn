import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    minLength: 3,
    required: true,
  })
  @IsNotEmpty()
  @MinLength(3)
  name: string;
  @ApiProperty({ required: true })
  @IsUrl()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description: string;
}
