import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseTime } from './base/time.entity';
import { Course } from './course.entity';
import { LessonProcess } from './lesson-process.entity';

@Entity()
export class Lesson extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  lessonUrl: string;

  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;

  @OneToMany(() => LessonProcess, (course) => course.lesson)
  processes: LessonProcess[];
}
