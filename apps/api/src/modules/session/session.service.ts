import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminSession, UserSession } from '@/databases/entities';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
    @InjectRepository(AdminSession)
    private readonly adminSessionRepository: Repository<AdminSession>
  ) {}

  async createAdminSession(options: Partial<AdminSession>): Promise<AdminSession> {
    const { id, admin } = options;
    let adminSessionExist: AdminSession;

    if (admin) {
      adminSessionExist = await this.adminSessionRepository
        .createQueryBuilder('adminSession')
        .where('adminSession.admin = :admin', { admin: options.admin.id })
        .getOne();
    } else {
      adminSessionExist = await this.adminSessionRepository
        .createQueryBuilder('adminSession')
        .where('adminSession.id = :id', { id })
        .innerJoinAndSelect('adminSession.admin', 'admin')
        .getOne();
    }

    if (adminSessionExist) {
      await this.deleteAdminSession({
        id: adminSessionExist.id,
      });
    }

    if (id) {
      options.admin = adminSessionExist.admin;
      delete options.id;
    }

    const adminSession = this.adminSessionRepository.create(options);
    return await this.adminSessionRepository.save(adminSession);
  }

  async deleteAdminSession(options: Partial<AdminSession>): Promise<boolean> {
    const { affected } = await this.adminSessionRepository.delete(options);
    return affected > 0;
  }
}
