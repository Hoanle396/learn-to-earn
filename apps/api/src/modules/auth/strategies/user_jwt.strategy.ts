import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { Causes } from '@/common/exceptions/causes';
import type { DOPConfig } from '@/configs';
import type { UserAuthConfig } from '@/configs/user_auth.config';
import { UserSession } from '@/databases/entities';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(
    private readonly configService: ConfigService<DOPConfig>,
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<UserAuthConfig>('userAuth').accessTokenSecret,
    });
  }

  async validate(payload: { session: string }) {
    let userExist = await this.userSessionRepository
      .createQueryBuilder('userSession')
      .innerJoin('userSession.user', 'user')
      .where('userSession.id = :id', { id: payload.session })
      .andWhere('userSession.expiresAt > :date', { date: new Date() })
      .andWhere('user.isActive = :isActive', { isActive: true })
      .select([
        'user.id as id',
        'user.isActive as isActive',
        'user.wallet as wallet',
        'user.createdAt as createdAt',
        'user.email as email',
        'user.fullName as fullName',
      ])
      .getRawOne();

    if (!userExist) throw Causes.UNAUTHORIZED('Access Token', 'Invalid access token');

    return userExist;
  }
}
