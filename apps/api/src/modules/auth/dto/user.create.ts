import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserDto {
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

  @ApiProperty({
    minLength: 6,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;
}
