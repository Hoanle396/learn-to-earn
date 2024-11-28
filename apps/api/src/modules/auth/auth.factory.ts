import { Injectable } from '@nestjs/common';

import { BasicAuthService } from './basic_auth.service';
import { GoogleAuthService } from './google_auth.service';

@Injectable()
export class AuthFactory {
  constructor(
    private googleAuthService: GoogleAuthService,
    readonly basicAuthService: BasicAuthService
  ) {}

  getGoogleAuthService() {
    return this.googleAuthService;
  }

  getBasicAuthService() {
    return this.basicAuthService;
  }
}
