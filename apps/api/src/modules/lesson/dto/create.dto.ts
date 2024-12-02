import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  index: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  lessonUrl: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  courseId: number;
}
