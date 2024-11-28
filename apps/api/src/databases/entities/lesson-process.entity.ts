import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base/base.entity';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Entity()
export class LessonProcess extends BaseEntity {
  @ManyToOne(
    () => Lesson,
    (course) => course.processes
  )
  lesson: Lesson;

  @Column({ default: false, type: 'boolean' })
  done: boolean;

  @ManyToOne(() => User)
  user: User;
}
