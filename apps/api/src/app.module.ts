import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { OrmModule } from './orm.module';

import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ExceptionFilter } from './common/exceptions/exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { load } from './configs';
import { HttpModule } from '@nestjs/axios';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleGuard } from './modules/auth/guards/role.guard';
import { CategoryModule } from './modules/category/category.module';
import { CourseModule } from './modules/course/course.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { RankingModule } from './modules/ranking/ranking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load,
    }),
    OrmModule,
    TerminusModule,
    HttpModule,
    AdminModule,
    AuthModule,
    CategoryModule,
    CourseModule,
    LessonModule,
    RankingModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
