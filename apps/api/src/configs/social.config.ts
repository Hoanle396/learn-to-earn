import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';

export class SocialConfig {
  @IsNotEmpty()
  @IsString()
  googleClientId: string;

  @IsNotEmpty()
  @IsString()
  googleClientSecret: string;

  constructor() {
    this.googleClientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
    this.googleClientSecret = process.env.GOOGLE_OAUTH_SECRET;
  }
}

export default registerAs<SocialConfig>('social', () => new SocialConfig());
