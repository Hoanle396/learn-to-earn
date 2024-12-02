import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, Lesson } from '@/databases/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Lesson])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
