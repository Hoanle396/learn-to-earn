import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { OrmModule } from './orm.module';

import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { load } from './configs';
import { WorkerModule } from './modules/worker/worker.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load,
    }),
    ScheduleModule.forRoot(),
    OrmModule,
    TerminusModule,
    HttpModule,
    WorkerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
