import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserByPasswordDto {
  @ApiProperty({ required: true, example: 'khanhnguyen@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, example: '123456' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
