import { Entity, ManyToOne } from 'typeorm';

import { Course, User } from '.';
import { BaseEntity } from './base/base.entity';

@Entity()
export class UserCourse extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  course: Course;
}
