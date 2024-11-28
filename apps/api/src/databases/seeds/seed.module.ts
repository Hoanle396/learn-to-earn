import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { load } from 'src/configs';
import { OrmModule } from 'src/orm.module';

import { TokenSeedModule } from './token/token_seed.module';
import { AdminSeedModule } from './admin/admin_seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load,
    }),
    OrmModule,
    TokenSeedModule,
    AdminSeedModule,
  ],
})
export class SeedModule {}