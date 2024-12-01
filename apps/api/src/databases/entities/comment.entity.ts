import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base/base.entity';
import { Course, User } from '.';

@Entity()
export class Comment extends BaseEntity {
  @ManyToOne(
    () => Course,
    (m) => m.id
  )
  course: Course;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => User)
  user: User;
}
