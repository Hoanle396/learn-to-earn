import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create.dto';
import { Category, Course, Lesson, LessonProcess, User, UserCourse } from '@/databases/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { QueryPaginationDto } from '@/shared/dto/pagination.query';
import { paginateEntities } from '@/utils/paginate';
import { UpdateCourseDto } from './dto/update.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(UserCourse)
    private userCourseRepository: Repository<UserCourse>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(LessonProcess)
    private lessonProcessRepository: Repository<LessonProcess>
  ) { }

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
    const course = await this.courseRepository.findOne({
      where: { id }, relations: {
        category: true,
        lessons: true,
      }
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
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

  async userSubscribe(id: number, user: User) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const exits = await this.userCourseRepository.findOne({
      where: { course: { id: course.id }, user: { id: user.id } },
    });

    if (exits) {
      throw new BadRequestException('User already subscribed to course');
    }

    const userCourse = new UserCourse();
    userCourse.course = course;
    userCourse.user = user;

    const lesson = await this.lessonRepository.findOneBy({ course: { id: course.id }, index: 1 });
    if (lesson) {
      const lessonProcess = new LessonProcess();
      lessonProcess.lesson = lesson;
      lessonProcess.user = user;
      await this.lessonProcessRepository.save(lessonProcess);
    }
    return await this.userCourseRepository.save(userCourse);
  }

  async learn(id: number, user: User, percent: number) {
    const lesson = await this.lessonRepository.findOneBy({ id });
    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }
    const lessonProcess = await this.lessonProcessRepository.findOneBy({
      lesson: { id },
      user: { id: user.id },
      percent: LessThan(100),
    });
    if (lessonProcess && lessonProcess.percent < percent) {
      lessonProcess.percent = percent;
      return await this.lessonProcessRepository.save(lessonProcess);
    } else {
      const nextLesson = await this.lessonRepository.findOneBy({
        course: { id: lesson.course.id },
        index: lesson.index + 1,
      });
      if (nextLesson) {
        const lessonProcess = new LessonProcess();
        lessonProcess.lesson = lesson;
        lessonProcess.user = user;
        lessonProcess.percent = 0;
        return await this.lessonProcessRepository.save(lessonProcess);
      }
      throw new BadRequestException('You have completed the course');
    }
  }

  async findMyCourses(user: User, query: QueryPaginationDto) {
    const builder = this.userCourseRepository
      .createQueryBuilder('userCourse')
      .leftJoinAndSelect('userCourse.course', 'course')
      .where('userCourse.user = :user', { user });
    return await paginateEntities(builder, query);
  }
}
