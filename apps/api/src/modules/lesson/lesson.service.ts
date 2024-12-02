import { Course, Lesson } from '@/databases/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create.dto';
import { QueryPaginationDto } from '@/shared/dto/pagination.query';
import { paginateEntities } from '@/utils/paginate';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    @InjectRepository(Course) private courseRepository: Repository<Course>
  ) {}

  async create(dto: CreateLessonDto) {
    const course = await this.courseRepository.findOne({ where: { id: dto.courseId } });
    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const lesson = new Lesson();
    lesson.title = dto.title;
    lesson.index = dto.index;
    lesson.description = dto.description;
    lesson.lessonUrl = dto.lessonUrl;
    lesson.course = course;
    return await this.lessonRepository.save(lesson);
  }

  async bulkCreate(id: number, dto: CreateLessonDto[]) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const lessons = [];
    for (const c of dto) {
      const lesson = new Lesson();
      lesson.title = c.title;
      lesson.index = c.index;
      lesson.description = c.description;
      lesson.lessonUrl = c.lessonUrl;
      lesson.course = course;
    }
    return await this.lessonRepository.save(lessons);
  }

  async findAll(id: number, query: QueryPaginationDto) {
    const builder = this.lessonRepository.createQueryBuilder('lesson').where('lesson.courseId = :id', { id });
    return await paginateEntities(builder, query);
  }

  async findOne(id: number) {
    const lesson = await this.lessonRepository.findOne({ where: { id } });
    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }
    return lesson;
  }
}
