import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Client } from 'google-auth-library';
import { CustomException } from 'src/common/exceptions/custom_exception';
import type { StellaConfig } from 'src/configs';
import { Admin, User } from 'src/database/entities';
import type { ISocial } from 'src/shared/interfaces/social.interface';
import type { ISocialAuth } from 'src/shared/interfaces/social_auth.interface';
import type { TokensType } from 'src/shared/types';
import { Repository } from 'typeorm';

import { AuthHelperService } from './auth_helper.service';
import type { CreateUserBySocialDto } from './dto/user_social.create';

@Injectable()
export class GoogleAuthService implements ISocialAuth {
  private google: OAuth2Client;

  constructor(
    private readonly configService: ConfigService<StellaConfig>,
    private readonly authHelperService: AuthHelperService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.google = new OAuth2Client(
      this.configService.get('social.googleClientId', { infer: true }),
      this.configService.get('social.googleClientSecret', { infer: true }),
      'postmessage',
    );
  }

  private async getProfileByToken(code: string): Promise<ISocial> {
    try {
      const ticket = await this.getGoogleLoginTicket(code);

      const data = ticket.getPayload();

      if (!data) {
        throw new BadRequestException('Wrong token');
      }

      return {
        id: data.sub,
        email: data.email,
        firstName: data.given_name,
        lastName: data.family_name,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async getGoogleLoginTicket(code: string) {
    const { tokens } = await this.google.getToken(code);
    return await this.google.verifyIdToken({
      idToken: tokens.id_token,
      audience: [
        this.configService.getOrThrow('social.googleClientId', { infer: true }),
      ],
    });
  }

  private async validateSocialAdmin(socialData: ISocial): Promise<Admin> {
    let admin: Admin = null;
    const { id, email } = socialData;

    admin = await this.adminRepository.findOne({
      where: {
        email,
      },
    });

    if (!admin) {
      throw new CustomException(
        'Access Denied! Your email address is not authorized to access this site!',
        HttpStatus.FORBIDDEN,
      );
    } else {
      if (!admin.isActive) {
        throw new CustomException('Admin is not active!', HttpStatus.FORBIDDEN);
      }

      if (!admin.socialId) {
        await this.adminRepository.update(admin.id, {
          socialId: id,
        });
      }
    }

    return admin;
  }

  async createAdminSession(
    input: CreateUserBySocialDto,
  ): Promise<{ admin: Admin; tokens: TokensType }> {
    const socialData = await this.getProfileByToken(input.code);
    const admin = await this.validateSocialAdmin(socialData);
    const tokens = await this.authHelperService.createTokensAsAdmin(admin);

    return {
      admin,
      tokens,
    };
  }
}
