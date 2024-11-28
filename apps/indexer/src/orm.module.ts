import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './databases';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('database.type'),
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          entities: entities,
          logging: configService.get('database.logging'),
          synchronize: false,
          autoLoadEntities: false,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
  ],
})
export class OrmModule {}
