import type { Admin, User } from 'src/database/entities';
import type { CreateUserBySocialDto } from 'src/modules/auth/dto/user_social.create';

import type { TokensType } from '../types';

export interface ISocialAuth {
  createUserSession(
    input: CreateUserBySocialDto,
  ): Promise<{ user: User; tokens: TokensType }>;

  createAdminSession(
    input: CreateUserBySocialDto,
  ): Promise<{ admin: Admin; tokens: TokensType }>;
}
