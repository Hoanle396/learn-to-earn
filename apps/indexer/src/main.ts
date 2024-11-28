import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const logger = new Logger(NestApplication.name);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get('main.port') ?? 3001;
  await app.listen(port);
  logger.log(`⚡Nest application is running on port ${port}!`);
}
bootstrap();
