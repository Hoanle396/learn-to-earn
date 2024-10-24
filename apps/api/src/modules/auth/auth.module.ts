import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Admin,
  AdminSession,
  User,
  UserSession,
  UserSocial,
} from 'src/database/entities';

import { ServicesModule } from '../services/services.module';
import { SessionModule } from '../session/session.module';
import { AuthController } from './auth.controller';
import { AuthFactory } from './auth.factory';
import { AuthHelperService } from './auth_helper.service';
import { BasicAuthService } from './basic_auth.service';
import { FacebookAuthService } from './facebook_auth.service';
import { GoogleAuthService } from './google_auth.service';
import { HashService } from './hash.service';
import { MyJwtService } from './jwt.service';
import { AdminJwtStrategy } from './strategies/admin_jwt.strategy';
import { AdminJwtRefreshTokenStrategy } from './strategies/admin_jwt_refresh_token.strategy';
import { UserJwtStrategy } from './strategies/user_jwt.strategy';
import { UserJwtRefreshTokenStrategy } from './strategies/user_jwt_refresh_token.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Admin,
      UserSocial,
      UserSession,
      AdminSession,
    ]),
    JwtModule.register({}),
    SessionModule,
    ServicesModule,
  ],
  providers: [
    AuthFactory,
    AuthHelperService,
    MyJwtService,
    GoogleAuthService,
    FacebookAuthService,
    BasicAuthService,
    HashService,
    AdminJwtStrategy,
    AdminJwtRefreshTokenStrategy,
    UserJwtStrategy,
    UserJwtRefreshTokenStrategy,
  ],
  controllers: [AuthController],
  exports: [MyJwtService],
})
export class AuthModule {}