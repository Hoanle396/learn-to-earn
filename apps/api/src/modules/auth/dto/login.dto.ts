import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    minLength: 6,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @MinLength(6)
  email: string;

  @ApiProperty({
    minLength: 6,
    required: true,
  })
  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(8)
  password: string;
}
