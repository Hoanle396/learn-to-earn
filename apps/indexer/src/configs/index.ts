import type { ConfigFactory } from '@nestjs/config';
import type { ClassConstructor } from 'class-transformer';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ContractConfig } from './contract.config';
import contract from './contract.config';
import { DatabaseConfig } from './database.config';
import database from './database.config';
import { MainConfig } from './main.config';
import main from './main.config';

async function validateConfig<T extends object>(configClass: ClassConstructor<T>, config: NodeJS.ProcessEnv) {
  const configInstance = plainToClass(configClass, config);
  try {
    await validateOrReject(configInstance);
  } catch (errors) {
    throw new Error(`${configClass.name} config validation failed!\nSuggestion: ${errors}`);
  }
}

export async function validateAllConfigs() {
  await Promise.all([
    validateConfig(MainConfig, process.env),
    validateConfig(DatabaseConfig, process.env),
    validateConfig(ContractConfig, process.env),
  ]);
}

export const load: ConfigFactory[] = [main, database, contract];

export type DOPConfig = {
  main: MainConfig;
  database: DatabaseConfig;
  contract: ContractConfig;
};
