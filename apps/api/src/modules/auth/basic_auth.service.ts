import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from 'src/common/exceptions/custom_exception';
import { User } from 'src/database/entities';
import type { IBasicAuth } from 'src/shared/interfaces/basic_auth.interface';
import type { TokensType } from 'src/shared/types';
import { Repository } from 'typeorm';

import { AuthHelperService } from './auth_helper.service';
import type { ValidateUserByPasswordDto } from './dto/user.validate';
import type { CreateUserByPasswordDto } from './dto/user_basic.create';
import { HashService } from './hash.service';

@Injectable()
export class BasicAuthService implements IBasicAuth {
  constructor(
    private readonly hashService: HashService,
    private readonly authHelperService: AuthHelperService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createUser(
    dto: CreateUserByPasswordDto,
  ): Promise<{ user: User; tokens: TokensType }> {
    const { email, password } = dto;

    const userExist = await this.userRepository.findOne({
      where: {
        email,
      },
      select: ['id'],
    });

    if (userExist)
      throw new CustomException('Email already exists', HttpStatus.CONFLICT);

    const passwordHash = await this.hashService.hash(password);

    const user = await this.userRepository.save({
      email,
      password: passwordHash,
    });

    const tokens = await this.authHelperService.createTokensAsUser(user);

    delete user.password;

    return {
      user,
      tokens,
    };
  }

  async validateUser(
    dto: ValidateUserByPasswordDto,
  ): Promise<{ user: User; tokens: TokensType }> {
    const { email, password } = dto;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await this.hashService.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password incorrect');
    }

    const tokens = await this.authHelperService.createTokensAsUser(user);

    delete user.password;

    return {
      user,
      tokens,
    };
  }

  async updateWallet(user: User, wallet: string) {
    user.wallet = wallet;
    return await this.userRepository.save(user);
  }
}
