import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base/base.entity';
import { Lesson, User } from '.';

@Entity()
export class LessonProcess extends BaseEntity {
  @ManyToOne(
    () => Lesson,
    (course) => course.processes
  )
  lesson: Lesson;

  @Column({ default: 0, type: 'number' })
  percent: number;

  @ManyToOne(() => User)
  user: User;
}
