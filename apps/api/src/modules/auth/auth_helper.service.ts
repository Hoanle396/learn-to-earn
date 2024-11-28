import { Injectable } from '@nestjs/common';

import type { Admin } from '@/databases/entities';
import type { JwtPayloadType, TokensType } from '@/shared/types';

import { SessionService } from '../session/session.service';
import { MyJwtService } from './jwt.service';

@Injectable()
export class AuthHelperService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly jwtService: MyJwtService
  ) {}

  async createTokensAsAdmin(admin: Admin): Promise<TokensType> {
    const { id } = await this.sessionService.createAdminSession({
      admin,
    });

    const tokens = await this.jwtService.signAdminTokens({
      session: id,
    });

    return tokens;
  }

  async refreshTokenAsAdmin(payload: JwtPayloadType): Promise<TokensType> {
    const { session } = payload;
    const { id } = await this.sessionService.createAdminSession({
      id: session,
    });

    const tokens = await this.jwtService.signAdminTokens({
      session: id,
    });

    return tokens;
  }

  async logoutAsAdmin(session: string): Promise<boolean> {
    return await this.sessionService.deleteAdminSession({
      id: session,
    });
  }
}
