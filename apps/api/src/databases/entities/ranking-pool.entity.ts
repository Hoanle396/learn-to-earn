import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Quiz } from '.';

@Entity()
export class RankingPool extends BaseEntity {
  @Column({ nullable: true, type: 'integer' })
  onchainId: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 255 })
  logo: string;

  @Column()
  isVerified: boolean;

  @Column({ length: 18, nullable: false })
  price: string;

  @Column({ type: 'int', default: 20 })
  questionPerPool: number;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @Column({ type: 'timestamp', nullable: false })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: false })
  endTime: Date;

  @OneToMany(
    () => Quiz,
    (quiz) => quiz.rankingPool
  )
  quizzes: Quiz[];
}
