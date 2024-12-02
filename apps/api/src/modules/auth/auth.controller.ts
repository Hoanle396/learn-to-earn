import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { GetUser } from '@/common/decorators/user.decorator';

import type { TokensType } from '@/shared/types';
import type { JwtPayloadType } from '@/shared/types';
import { AuthHelperService } from './auth_helper.service';
import type { CreateUserBySocialDto } from './dto/user_social.create';
import { AdminJwtRefreshTokenGuard } from './guards/admin_jwt_refresh_token.guard';
import { GoogleAuthService } from './google_auth.service';
import { BasicAuthService } from './basic_auth.service';
import { CreateUserDto } from './dto/user.create';
import { LoginDto } from './dto/login.dto';
import { UserJwtRefreshTokenGuard } from './guards/user_jwt_refresh_token.guard';
import { UserJwtGuard } from './guards/user_jwt.guard';
import { User } from '@/databases/entities';
import { UpdateWalletDto } from './dto/update.wallet';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly basicAuthService: BasicAuthService,
    @Inject(AuthHelperService)
    private readonly authHelperService: AuthHelperService
  ) {}

  /**
   * Admin Routes
   */
  @Post('admin/login-with-google')
  async loginAsAdminWithGoogle(@Body() dto: CreateUserBySocialDto) {
    return await this.googleAuthService.createAdminSession(dto);
  }

  @ApiBearerAuth()
  @Post('admin/logout')
  @UseGuards(AdminJwtRefreshTokenGuard)
  async logoutAsAdmin(@GetUser('session') session: string): Promise<boolean> {
    return await this.authHelperService.logoutAsAdmin(session);
  }

  @ApiBearerAuth()
  @Post('admin/refresh-token')
  @UseGuards(AdminJwtRefreshTokenGuard)
  async refreshTokenAsAdmin(@GetUser() admin: JwtPayloadType): Promise<TokensType> {
    return await this.authHelperService.refreshTokenAsAdmin(admin);
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return await this.basicAuthService.createUser(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.basicAuthService.loginUser(dto);
  }

  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(UserJwtRefreshTokenGuard)
  async logoutAsUser(@GetUser('session') session: string): Promise<boolean> {
    return await this.authHelperService.logoutAsUser(session);
  }

  @ApiBearerAuth()
  @Post('refresh-token')
  @UseGuards(UserJwtRefreshTokenGuard)
  async refreshTokenAsUser(@GetUser() user: JwtPayloadType): Promise<TokensType> {
    return await this.authHelperService.refreshTokenAsUser(user);
  }

  @ApiBearerAuth()
  @Get('me')
  @UseGuards(UserJwtGuard)
  async getMe(@GetUser() user: User): Promise<User> {
    return user;
  }

  @ApiBearerAuth()
  @Post('update-address')
  @UseGuards(UserJwtGuard)
  async updateAddress(@GetUser() user: User, @Body() dto: UpdateWalletDto): Promise<User> {
    return await this.basicAuthService.updateWalletAddress(user, dto);
  }
}
