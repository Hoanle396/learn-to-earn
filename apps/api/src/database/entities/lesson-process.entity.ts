import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseTime } from './base/time.entity';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Entity()
export class LessonProcess extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lesson, (course) => course.processes)
  lesson: Lesson;

  @Column({ default: false, type: 'boolean' })
  done: boolean;

  @ManyToOne(() => User)
  user: User;
}
