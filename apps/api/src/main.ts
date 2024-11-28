import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { BigIntInterceptor } from './common/interceptors/bigint.interceptor';
import { compress } from './utils/compression';
import { setupSwagger } from './utils/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const logger = new Logger(NestApplication.name);
  const configService = app.get(ConfigService);

  app.set('trust proxy', true);
  app.setGlobalPrefix(configService.get('main.apiPrefix'));

  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  app.use(helmet());
  app.use(compress());

  app.useGlobalInterceptors(new BigIntInterceptor());

  const port = configService.get('main.port') ?? 3001;
  await app.listen(port);
  logger.log(`⚡Nest application is running on port ${port}!`);
}
bootstrap();
