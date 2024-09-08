import type { ConfigFactory } from '@nestjs/config';

import type { AdminAuthConfig } from './admin_auth.config';
import adminAuth from './admin_auth.config';
import type { DatabaseConfig } from './database.config';
import database from './database.config';
import type { MainConfig } from './main.config';
import main from './main.config';
import type { RedisConfig } from './redis.config';
import redis from './redis.config';
import type { SocialConfig } from './social.config';
import social from './social.config';
import type { UserAuthConfig } from './user_auth.config';
import userAuth from './user_auth.config';

export const load: ConfigFactory[] = [
  main,
  database,
  redis,
  adminAuth,
  userAuth,
  social,
];

export type StellaConfig = {
  main: MainConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  adminAuth: AdminAuthConfig;
  userAuth: UserAuthConfig;
  social: SocialConfig;
};
