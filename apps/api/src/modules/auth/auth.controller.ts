import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { GetUser } from '@/common/decorators/user.decorator';

import type { TokensType } from '@/shared/types';
import { JwtPayloadType } from '@/shared/types';

import { AuthFactory } from './auth.factory';
import { AuthHelperService } from './auth_helper.service';
import { CreateUserBySocialDto } from './dto/user_social.create';
import { AdminJwtRefreshTokenGuard } from './guards/admin_jwt_refresh_token.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authFactory: AuthFactory,
    private readonly authHelperService: AuthHelperService
  ) {}

  /**
   * Admin Routes
   */
  @Post('admin/login-with-google')
  async loginAsAdminWithGoogle(@Body() dto: CreateUserBySocialDto) {
    const authService = this.authFactory.getGoogleAuthService();
    return await authService.createAdminSession(dto);
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
}
