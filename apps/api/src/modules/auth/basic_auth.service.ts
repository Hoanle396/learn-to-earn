import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.create';
import { AuthHelperService } from './auth_helper.service';
import { HttpService } from '@nestjs/axios';
import { User } from '@/databases/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashService } from './hash.service';
import { LoginDto } from './dto/login.dto';
import { TokensType } from '@/shared/types';
import { UpdateWalletDto } from './dto/update.wallet';

@Injectable()
export class BasicAuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly authHelperService: AuthHelperService,
    private readonly httpService: HttpService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(dto: CreateUserDto) {
    const { fullName, email, password } = dto;
    const exits = await this.userRepository.findOne({ where: { email } });
    if (exits) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await this.hashService.hash(password);

    const user = await this.userRepository.save({
      fullName,
      email,
      password: passwordHash,
    });

    const tokens = await this.authHelperService.createTokensAsUser(user);

    delete user.password;

    return {
      user: {
        ...user,
        token: tokens.accessToken,
      },
      tokens,
    };
  }

  async loginUser(dto: LoginDto): Promise<{ user: User; tokens: TokensType }> {
    const { email, password } = dto;

    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const compare = await this.hashService.compare(password, user.password);

    if (!compare) {
      throw new Error('Password is incorrect');
    }

    delete user.password;

    const tokens = await this.authHelperService.createTokensAsUser(user);

    return {
      user,
      tokens,
    };
  }

  async updateWalletAddress(user: User, dto: UpdateWalletDto) {
    const { wallet } = dto;
    if (user.wallet) {
      throw new ConflictException('Wallet already exists');
    }
    user.wallet = wallet;
    return await this.userRepository.save(user);
  }
}
