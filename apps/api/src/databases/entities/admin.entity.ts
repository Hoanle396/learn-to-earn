import { Column, Entity } from 'typeorm';

import { RoleEnum } from '@/shared/enums';
import { BaseEntity } from './base/base.entity';

@Entity()
export class Admin extends BaseEntity {
  @Column({ unique: true, length: 100, nullable: false })
  email: string;

  @Column({ length: 100, nullable: false })
  fullName: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.ADMIN,
    nullable: false,
  })
  role: RoleEnum;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
