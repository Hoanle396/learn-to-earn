import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleEnum } from '@/shared/enums';
import { Admin } from '@/databases/entities';

@Injectable()
export class AdminSeedService {
  logger = new Logger(AdminSeedService.name);

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>
  ) {}

  async bootstrap(): Promise<void> {
    await this.truncateTables();
    await this.seedAdmin();

    this.logger.log('The data seeding process for Admin has been completed successfully!');
  }

  private async truncateTables(): Promise<void> {
    await this.adminRepository.query(`TRUNCATE TABLE admin RESTART IDENTITY CASCADE`);
  }

  private async seedAdmin(): Promise<void> {
    const admins = [
      {
        id: 1,
        email: 'hoanlh@var-meta.com',
        fullName: 'Lê Hữu Hoàn',
        role: RoleEnum.SUPER_ADMIN,
        isActive: true,
      },
    ];

    const values = admins
      .map((admin) => `(${admin.id}, '${admin.email}', '${admin.fullName}', '${admin.role}', ${admin.isActive})`)
      .join(', ');

    await this.adminRepository.save(admins);
  }
}
