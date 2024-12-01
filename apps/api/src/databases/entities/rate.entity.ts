import { Column, Entity, ManyToOne, } from 'typeorm';

import { BaseEntity } from './base/base.entity';
import { Course, User } from '.';

@Entity()
export class Vote extends BaseEntity {
  @ManyToOne(
    () => Course,
    (m) => m.id
  )
  course: Course;

  @Column({ nullable: true, type: 'float' })
  rate: number;

  @ManyToOne(() => User)
  user: User;
}
