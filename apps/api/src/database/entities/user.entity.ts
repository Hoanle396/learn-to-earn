import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserSocial } from '.';
import { BaseTime } from './base/time.entity';

@Entity()
export class User extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100, nullable: true })
  email: string;

  @Column({ length: 100, nullable: true })
  fullName: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => UserSocial, (social) => social.user)
  socials: UserSocial[];
}
