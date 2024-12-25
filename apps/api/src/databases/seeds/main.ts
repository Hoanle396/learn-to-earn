import { Logger } from 'hidrajs-winston-logger';
import { NestFactory } from '@nestjs/core';

import { AdminSeedService } from './admin/admin_seed.service';
import { SeedModule } from './seed.module';
import { TokenSeedService } from './token/token_seed.service';
import { CategorySeedService } from './category/category.service';

const logger = new Logger('Seed');

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(AdminSeedService).bootstrap();
  await app.get(TokenSeedService).bootstrap();
  await app.get(CategorySeedService).bootstrap();

  await app.close();
  logger.log('Seed successfully!');
};

void runSeed();
