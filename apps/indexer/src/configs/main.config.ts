import { registerAs } from '@nestjs/config';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class MainConfig {
  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @IsBoolean()
  isProduction: boolean;

  constructor() {
    this.port = Number(process.env.PORT);
    this.isProduction = process.env.PRODUCTION === 'true';
  }
}

export default registerAs<MainConfig>('main', () => new MainConfig());