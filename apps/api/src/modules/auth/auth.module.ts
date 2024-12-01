import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin, AdminSession, User, UserSession } from '@/databases/entities';

import { SessionModule } from '../session/session.module';
import { AuthController } from './auth.controller';
import { AuthHelperService } from './auth_helper.service';
import { BasicAuthService } from './basic_auth.service';
import { GoogleAuthService } from './google_auth.service';
import { MyJwtService } from './jwt.service';
import { AdminJwtStrategy } from './strategies/admin_jwt.strategy';
import { AdminJwtRefreshTokenStrategy } from './strategies/admin_jwt_refresh_token.strategy';
import { HashService } from './hash.service';
import { UserJwtRefreshTokenStrategy } from './strategies/user_jwt_refresh_token.strategy';
import { UserJwtStrategy } from './strategies/user_jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, AdminSession, User, UserSession]),
    JwtModule.register({}),
    SessionModule,
    HttpModule,
  ],
  providers: [
    MyJwtService,
    AuthHelperService,
    BasicAuthService,
    HashService,
    GoogleAuthService,
    AdminJwtStrategy,
    AdminJwtRefreshTokenStrategy,
    UserJwtRefreshTokenStrategy,
    UserJwtStrategy,
  ],
  controllers: [AuthController],
  exports: [MyJwtService],
})
export class AuthModule {}
