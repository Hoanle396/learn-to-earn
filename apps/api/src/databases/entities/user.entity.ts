import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base/base.entity';
import { UserQuiz } from '.';

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

  @OneToMany(
    () => UserQuiz,
    (userQuiz) => userQuiz.user
  )
  userQuiz: UserQuiz[];
}
