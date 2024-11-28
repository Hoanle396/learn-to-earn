import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base/base.entity';
import { Course } from './course.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  icon: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(
    () => Course,
    (course) => course.category
  )
  courses: Course[];
}
