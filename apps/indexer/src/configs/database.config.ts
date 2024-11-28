import { registerAs } from '@nestjs/config';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DatabaseConfig {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  host: string;

  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  database: string;

  @IsNotEmpty()
  @IsBoolean()
  logging: boolean;

  constructor() {
    this.type = process.env.DB_TYPE || 'postgres';
    this.host = process.env.DB_HOST || 'localhost';
    this.port = Number(process.env.DB_PORT) || 5432;
    this.username = process.env.DB_USERNAME || 'postgres';
    this.password = process.env.DB_PASSWORD || 'postgres';
    this.database = process.env.DB_DATABASE || 'postgres';
    this.logging = process.env.DB_LOGGING === 'true';
  }
}

export default registerAs<DatabaseConfig>('database', () => new DatabaseConfig());
