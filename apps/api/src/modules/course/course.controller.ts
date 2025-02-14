import { GetUser } from '@/common/decorators/user.decorator';
import { User } from '@/databases/entities';
import { QueryPaginationDto } from '@/shared/dto/pagination.query';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminJwtGuard } from '../auth/guards/admin_jwt.guard';
import { UserJwtGuard } from '../auth/guards/user_jwt.guard';
import { UpdateCategoryDto } from '../category/dto/update.dto';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create.dto';
import { LearnDto } from './dto/learn.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  async create(@Body() body: CreateCourseDto) {
    return await this.courseService.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(UserJwtGuard)
  @ApiOperation({ summary: 'Subscribe to a category' })
  @Post('subscribe/:id')
  async subscribe(@GetUser() user: User, @Param('id') id: number) {
    return await this.courseService.userSubscribe(id, user);
  }

  @ApiBearerAuth()
  @UseGuards(UserJwtGuard)
  @ApiOperation({ summary: 'Learn to a category' })
  @Post('learn/:id')
  async learn(@GetUser() user: User, @Param('id') id: number, @Body() body: LearnDto) {
    return await this.courseService.learn(id, user, body.percent);
  }

  @Get()
  async findAll(@Query() query: QueryPaginationDto) {
    return await this.courseService.findAll(query);
  }

  @Get('my-course')
  @ApiBearerAuth()
  @UseGuards(UserJwtGuard)
  async findMyCourse(@GetUser() user: User, @Query() query: QueryPaginationDto) {
    return await this.courseService.findMyCourses(user, query);
  }

  @Get('my-course/:id')
  @ApiBearerAuth()
  @UseGuards(UserJwtGuard)
  async findMyCourseDetail(@GetUser() user: User, @Param('id') id: number) {
    return await this.courseService.findMyCourseDetail(user, id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.courseService.findOne(id);
  }


  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  async update(@Param('id') id: number, @Body() body: UpdateCategoryDto) {
    return await this.courseService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  async remove(@Param('id') id: number) {
    return await this.courseService.remove(id);
  }
}
