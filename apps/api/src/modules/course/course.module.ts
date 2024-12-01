import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Course } from '@/databases/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Category])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
