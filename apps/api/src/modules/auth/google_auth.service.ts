import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

import { Causes } from '@/common/exceptions/causes';
import { Admin } from '@/databases/entities';
import type { TokensType } from '@/shared/types';

import { AuthHelperService } from './auth_helper.service';
import type { CreateUserBySocialDto } from './dto/user_social.create';
import { DOPConfig } from '@/configs';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly configService: ConfigService<DOPConfig>,
    private readonly authHelperService: AuthHelperService,
    private readonly httpService: HttpService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>
  ) {}

  private async getProfileByToken(accessToken: string) {
    try {
      const googleApi = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;
      const { data } = await firstValueFrom(
        this.httpService.get(googleApi).pipe(
          catchError((error: any) => {
            Logger.error(error.response.data.error.status);
            throw error.response.data.error;
          })
        )
      );
      const { id, email, given_name: firstName, family_name: lastName } = data;

      return {
        id,
        email,
        firstName,
        lastName,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async validateSocialAdmin(socialData): Promise<Admin> {
    let admin: Admin = null;
    const { id, email } = socialData;

    admin = await this.adminRepository.findOne({
      where: {
        email,
      },
    });

    if (!admin) {
      throw Causes.FORBIDDEN('Email', 'Access Denied! Your email address is not authorized to access this site!');
    } else {
      if (!admin.isActive) {
        throw Causes.FORBIDDEN('Admin', 'Admin is not active!');
      }
    }

    return admin;
  }

  async createAdminSession(input: CreateUserBySocialDto): Promise<{ admin: Admin; tokens: TokensType }> {
    const socialData = await this.getProfileByToken(input.accessToken);
    const admin = await this.validateSocialAdmin(socialData);
    const tokens = await this.authHelperService.createTokensAsAdmin(admin);

    return {
      admin,
      tokens,
    };
  }
}
