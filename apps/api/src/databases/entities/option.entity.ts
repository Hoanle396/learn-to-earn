import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { OptionQuiz } from '@/shared/enums';
import { Quiz, UserQuiz } from '.';

@Entity()
export class Option extends BaseEntity {
  @Column({ type: 'text' })
  answer: string;

  @Column({ type: 'enum', enum: OptionQuiz })
  option: boolean;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'boolean', default: false })
  isCorrect: boolean;

  @ManyToOne(
    () => Quiz,
    (quiz) => quiz.options
  )
  quiz: Quiz;

  @OneToMany(
    () => UserQuiz,
    (userQuiz) => userQuiz.answer
  )
  userQuiz: UserQuiz[];
}
