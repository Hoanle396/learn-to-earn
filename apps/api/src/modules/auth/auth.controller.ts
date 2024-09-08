import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/user.decorator';
import {
  BasicAuthEnum,
  SocialAuthEnum,
  SwaggerOperationEnum,
} from 'src/shared/enums';
import type { TokensType } from 'src/shared/types';
import { JwtPayloadType } from 'src/shared/types';

import { AuthFactory } from './auth.factory';
import { AuthHelperService } from './auth_helper.service';
import { ValidateUserByPasswordDto } from './dto/user.validate';
import { CreateUserByPasswordDto } from './dto/user_basic.create';
import { CreateUserBySocialDto } from './dto/user_social.create';
import { AdminJwtRefreshTokenGuard } from './guards/admin_jwt_refresh_token.guard';
import { UserJwtRefreshTokenGuard } from './guards/user_jwt_refresh_token.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authFactory: AuthFactory,
    private readonly authHelperService: AuthHelperService,
  ) {}

  /**
   * Admin Routes
   */
  @ApiOperation({ summary: SwaggerOperationEnum.ADMIN })
  @Post('admin/login-with-google')
  async loginAsAdminWithGoogle(@Body() dto: CreateUserBySocialDto) {
    const authService = this.authFactory.getSocialAuthService(
      SocialAuthEnum.GOOGLE,
    );
    return await authService.createAdminSession(dto);
  }

  @ApiOperation({ summary: SwaggerOperationEnum.ADMIN })
  @ApiBearerAuth()
  @Get('admin/logout')
  @UseGuards(AdminJwtRefreshTokenGuard)
  async logoutAsAdmin(@GetUser('session') session: string): Promise<boolean> {
    return await this.authHelperService.logoutAsAdmin(session);
  }

  @ApiOperation({ summary: SwaggerOperationEnum.ADMIN })
  @ApiBearerAuth()
  @Get('admin/refresh-token')
  @UseGuards(AdminJwtRefreshTokenGuard)
  async refreshTokenAsAdmin(
    @GetUser() admin: JwtPayloadType,
  ): Promise<TokensType> {
    return await this.authHelperService.refreshTokenAsAdmin(admin);
  }

  /**
   * User Routes
   */
  @Post('user/login-with-google')
  async loginAsUserWithGoogle(@Body() dto: CreateUserBySocialDto) {
    const authService = this.authFactory.getSocialAuthService(
      SocialAuthEnum.GOOGLE,
    );
    return await authService.createUserSession(dto);
  }

  @Post('user/register-basic')
  async registerAsUser(@Body() dto: CreateUserByPasswordDto) {
    const authService = this.authFactory.getBasicAuthService(
      BasicAuthEnum.USER,
    );
    return await authService.createUser(dto);
  }

  @Post('user/login-basic')
  async loginAsUser(@Body() dto: ValidateUserByPasswordDto) {
    const authService = this.authFactory.getBasicAuthService(
      BasicAuthEnum.USER,
    );
    return await authService.validateUser(dto);
  }

  @ApiBearerAuth()
  @Get('user/logout')
  @UseGuards(UserJwtRefreshTokenGuard)
  async logoutAsUser(@GetUser('session') session: string): Promise<boolean> {
    return await this.authHelperService.logoutAsUser(session);
  }

  @ApiBearerAuth()
  @Get('user/refresh-token')
  @UseGuards(UserJwtRefreshTokenGuard)
  async refreshTokenAsUser(
    @GetUser() user: JwtPayloadType,
  ): Promise<TokensType> {
    return await this.authHelperService.refreshTokenAsUser(user);
  }
}
