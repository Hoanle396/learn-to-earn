import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { StellaConfig } from 'src/configs';
import type { AdminAuthConfig } from 'src/configs/admin_auth.config';
import { AdminSession } from 'src/database/entities';
import type { JwtPayloadType } from 'src/shared/types';
import { Repository } from 'typeorm';

@Injectable()
export class AdminJwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'admin-jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService<StellaConfig>,
    @InjectRepository(AdminSession)
    private readonly adminSessionRepository: Repository<AdminSession>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<AdminAuthConfig>('adminAuth').refreshTokenSecret,
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
