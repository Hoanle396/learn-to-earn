import { SocialAuthEnum } from 'src/shared/enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '.';
import { BaseTime } from './base/time.entity';

@Entity()
export class UserSocial extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100, nullable: false })
  email: string;

  @Column({ length: 100, nullable: false })
  fullName: string;

  @Column({ length: 255, nullable: false })
  socialId: string;

  @Column({
    type: 'enum',
    enum: SocialAuthEnum,
    default: SocialAuthEnum.GOOGLE,
    nullable: false,
  })
  socialType: SocialAuthEnum;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.socials)
  user: User;
}
