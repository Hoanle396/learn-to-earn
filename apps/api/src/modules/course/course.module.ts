import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Course, Lesson, LessonProcess, UserCourse } from '@/databases/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Category, UserCourse, Lesson, LessonProcess])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
