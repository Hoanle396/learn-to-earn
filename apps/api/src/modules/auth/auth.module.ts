import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin, AdminSession } from '@/databases/entities';

import { SessionModule } from '../session/session.module';
import { AuthController } from './auth.controller';
import { AuthFactory } from './auth.factory';
import { AuthHelperService } from './auth_helper.service';
import { BasicAuthService } from './basic_auth.service';
import { GoogleAuthService } from './google_auth.service';
import { MyJwtService } from './jwt.service';
import { AdminJwtStrategy } from './strategies/admin_jwt.strategy';
import { AdminJwtRefreshTokenStrategy } from './strategies/admin_jwt_refresh_token.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, AdminSession]),
    JwtModule.register({}),
    SessionModule,

    HttpModule,
  ],
  providers: [
    AuthFactory,
    AuthHelperService,
    MyJwtService,
    BasicAuthService,
    GoogleAuthService,
    AdminJwtStrategy,
    AdminJwtRefreshTokenStrategy,
  ],
  controllers: [AuthController],
  exports: [MyJwtService],
})
export class AuthModule {}
