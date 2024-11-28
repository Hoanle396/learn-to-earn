import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UserAuthConfig {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  accessTokenSecret: string;

  @IsNotEmpty()
  @IsNumber()
  accessTokenLifetime: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  refreshTokenSecret: string;

  @IsNotEmpty()
  @IsNumber()
  refreshTokenLifetime: number;

  @IsNotEmpty()
  @IsString()
  signatureMessage: string;

  constructor() {
    this.accessTokenSecret = process.env.USER_ACCESS_TOKEN_SECRET;
    this.accessTokenLifetime = Number(process.env.USER_ACCESS_TOKEN_LIFETIME);
    this.refreshTokenSecret = process.env.USER_REFRESH_TOKEN_SECRET;
    this.refreshTokenLifetime = Number(process.env.USER_REFRESH_TOKEN_LIFETIME);
    this.signatureMessage = process.env.USER_SIGNATURE_MESSAGE;
  }
}

export default registerAs<UserAuthConfig>('userAuth', () => new UserAuthConfig());
