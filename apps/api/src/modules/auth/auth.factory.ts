import { Injectable } from '@nestjs/common';
import { BasicAuthEnum, SocialAuthEnum } from 'src/shared/enums';
import type { IBasicAuth } from 'src/shared/interfaces/basic_auth.interface';
import type { ISocialAuth } from 'src/shared/interfaces/social_auth.interface';

import { BasicAuthService } from './basic_auth.service';
import { FacebookAuthService } from './facebook_auth.service';
import { GoogleAuthService } from './google_auth.service';

@Injectable()
export class AuthFactory {
  private socialAuthServices: { [key: string]: ISocialAuth };
  private basicAuthServices: { [key: string]: IBasicAuth };

  constructor(
    googleAuthService: GoogleAuthService,
    facebookAuthService: FacebookAuthService,
    basicAuthService: BasicAuthService,
  ) {
    this.socialAuthServices = {
      [SocialAuthEnum.GOOGLE]: googleAuthService,
      [SocialAuthEnum.FACEBOOK]: facebookAuthService,
    };

    this.basicAuthServices = {
      [BasicAuthEnum.ADMIN]: basicAuthService,
      [BasicAuthEnum.USER]: basicAuthService,
    };
  }

  getSocialAuthService(provider: SocialAuthEnum): ISocialAuth {
    const authService = this.socialAuthServices[provider];
    if (!authService) {
      throw new Error(`Unsupported auth provider: ${provider}`);
    }
    return authService;
  }

  getBasicAuthService(type: BasicAuthEnum): IBasicAuth {
    const authService = this.basicAuthServices[type];
    if (!authService) {
      throw new Error(`Unsupported auth type: ${type}`);
    }
    return authService;
  }
}
