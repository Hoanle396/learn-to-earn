import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base/base.entity';
import { Course } from './course.entity';
import { User } from './user.entity';

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
