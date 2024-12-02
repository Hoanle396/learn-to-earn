import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create.dto';
import { AdminJwtGuard } from '../auth/guards/admin_jwt.guard';
import { QueryPaginationDto } from '@/shared/dto/pagination.query';
import { UpdateCategoryDto } from '../category/dto/update.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserJwtGuard } from '../auth/guards/user_jwt.guard';
import { GetUser } from '@/common/decorators/user.decorator';
import { User } from '@/databases/entities';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  async create(@Body() body: CreateCourseDto) {
    return await this.courseService.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(UserJwtGuard)
  @ApiOperation({ summary: 'Subscribe to a category' })
  @Post(':id')
  async subscribe(@GetUser() user: User, @Param('id') id: number) {
    return await this.courseService.userSubscribe(id, user);
  }

  @Get()
  async findAll(@Query() query: QueryPaginationDto) {
    return await this.courseService.findAll(query);
  }

  @Get('my-course')
  @ApiBearerAuth()
  @UseGuards(UserJwtGuard)
  async findMyCourse(@GetUser() user: User) {
    return await this.courseService.findMyCourses(user);
  }

  @Get(':id')
  async findOne(@Query('id') id: number) {
    return await this.courseService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  async update(@Query('id') id: number, @Body() body: UpdateCategoryDto) {
    return await this.courseService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  async remove(@Query('id') id: number) {
    return await this.courseService.remove(id);
  }
}
