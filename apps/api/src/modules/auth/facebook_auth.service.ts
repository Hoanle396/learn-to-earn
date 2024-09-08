import { Injectable } from '@nestjs/common';
import type { ISocialAuth } from 'src/shared/interfaces/social_auth.interface';

@Injectable()
export class FacebookAuthService implements ISocialAuth {
  constructor() {}

  async createUserSession(input: any): Promise<{ user: any; tokens: any }> {
    const user: any = null;
    const tokens: any = null;
    return { user, tokens };
  }

  async createAdminSession(input: any): Promise<{ admin: any; tokens: any }> {
    const admin: any = null;
    const tokens: any = null;
    return { admin, tokens };
  }
}
