import { registerAs } from '@nestjs/config';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MainConfig {
  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @IsBoolean()
  isProduction: boolean;

  @IsNotEmpty()
  @IsString()
  apiPrefix: string;

  constructor() {
    this.port = Number(process.env.PORT);
    this.isProduction = process.env.PRODUCTION === 'true';
    this.apiPrefix = process.env.API_PREFIX || 'api';
  }
}

export default registerAs<MainConfig>('main', () => new MainConfig());
