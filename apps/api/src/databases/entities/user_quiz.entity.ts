import { Column, Entity, ManyToOne } from 'typeorm';
import { User, Option } from '.';
import { BaseEntity } from './base/base.entity';

@Entity()
export class UserQuiz extends BaseEntity {
  @ManyToOne(
    () => User,
    (user) => user.userQuiz
  )
  user: User;

  @ManyToOne(
    () => Option,
    (option) => option.userQuiz
  )
  answer: Option;

  @Column({ type: 'boolean' })
  isCorrect: boolean;
}
