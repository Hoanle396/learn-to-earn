import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create.dto';
import { Category, Course } from '@/databases/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryPaginationDto } from '@/shared/dto/pagination.query';
import { paginateEntities } from '@/utils/paginate';
import { UpdateCourseDto } from './dto/update.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createCourseDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const course = new Course();
    course.category = category;
    course.name = createCourseDto.name;
    course.logo = createCourseDto.logo;
    course.price = createCourseDto.price;
    course.description = createCourseDto.description;
    course.tags = createCourseDto.tags;
    return await this.courseRepository.save(course);
  }

  async findAll(query: QueryPaginationDto) {
    const builder = this.courseRepository.createQueryBuilder('course');
    return await paginateEntities(builder, query);
  }

  async findOne(id: number) {
    return await this.courseRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const { description, logo, name, price, tags } = updateCourseDto;
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (description) course.description = description;
    if (logo) course.logo = logo;
    if (name) course.name = name;
    if (price) course.price = price;
    if (tags.length) course.tags = tags;

    return await this.courseRepository.save(course);
  }

  async remove(id: number) {
    return await this.courseRepository.softRemove({ id });
  }
}
