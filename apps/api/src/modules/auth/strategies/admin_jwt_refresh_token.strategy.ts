import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { AdminSession } from '@/databases/entities';
import type { JwtPayloadType } from '@/shared/types';
import { DOPConfig } from '@/configs';

@Injectable()
export class AdminJwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'admin-jwt-refresh-token') {
  constructor(
    private readonly configService: ConfigService<DOPConfig>,
    @InjectRepository(AdminSession)
    private readonly adminSessionRepository: Repository<AdminSession>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('adminAuth.refreshTokenSecret', {
        infer: true,
      }),
    });
  }

  async validate(payload: JwtPayloadType): Promise<JwtPayloadType> {
    if (!payload?.session) {
      throw new ForbiddenException();
    }

    const sessionExist = await this.adminSessionRepository
      .createQueryBuilder('adminSession')
      .where('adminSession.id = :id', { id: payload.session })
      .getOne();
    if (!sessionExist) throw new ForbiddenException();

    return payload;
  }
}
