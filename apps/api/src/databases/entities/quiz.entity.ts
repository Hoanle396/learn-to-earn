import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Option, RankingPool } from '.';

@Entity()
export class Quiz extends BaseEntity {
  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text', nullable: true })
  image?: string;

  @OneToMany(
    () => Option,
    (option) => option.quiz
  )
  options: Option[];

  @ManyToOne(
    () => RankingPool,
    (rankingPool) => rankingPool.quizzes
  )
  rankingPool: RankingPool;
}
