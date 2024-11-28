import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base/base.entity';
import { Category } from './category.entity';
import { Lesson } from './lesson.entity';

@Entity()
export class Course extends BaseEntity {
  @ManyToOne(
    () => Category,
    (category) => category.courses
  )
  category: Category;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  logo: string;

  @Column({ length: 18, nullable: false })
  price: string;

  @OneToMany(
    () => Lesson,
    (lesson) => lesson.course
  )
  lessons: Lesson[];
}
