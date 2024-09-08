import type { User } from 'src/database/entities';
import type { ValidateUserByPasswordDto } from 'src/modules/auth/dto/user.validate';
import type { CreateUserByPasswordDto } from 'src/modules/auth/dto/user_basic.create';

import type { TokensType } from '../types';

export interface IBasicAuth {
  createUser(
    input: CreateUserByPasswordDto,
  ): Promise<{ user: User; tokens: TokensType }>;

  validateUser(
    input: ValidateUserByPasswordDto,
  ): Promise<{ user: User; tokens: TokensType }>;
}
