import { Column, Entity, ManyToOne, OneToMany, } from 'typeorm';

import { Course } from './course.entity';
import { LessonProcess } from './lesson-process.entity';
import { BaseEntity } from './base/base.entity';

@Entity()
export class Lesson extends BaseEntity {
  @Column()
  title: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  lessonUrl: string;

  @ManyToOne(
    () => Course,
    (course) => course.lessons
  )
  course: Course;

  @OneToMany(
    () => LessonProcess,
    (course) => course.lesson
  )
  processes: LessonProcess[];
}
