import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Course, LessonProcess } from '.';
import { BaseEntity } from './base/base.entity';

@Entity()
export class Lesson extends BaseEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({ default: 1 })
  index: number;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, type: 'text' })
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
