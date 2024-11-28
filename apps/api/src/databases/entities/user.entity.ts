import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, length: 100, nullable: true })
  email: string;

  @Column({ length: 100, nullable: true })
  fullName: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ length: 100, nullable: true })
  wallet: string;
}
