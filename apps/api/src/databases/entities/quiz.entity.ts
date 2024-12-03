import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Option } from '.';

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
}
