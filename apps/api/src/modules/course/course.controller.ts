import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create.dto';
import { AdminJwtGuard } from '../auth/guards/admin_jwt.guard';
import { QueryPaginationDto } from '@/shared/dto/pagination.query';
import { UpdateCategoryDto } from '../category/dto/update.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  async create(@Body() body: CreateCourseDto) {
    return await this.courseService.create(body);
  }

  @Get()
  async findAll(@Query() query: QueryPaginationDto) {
    return await this.courseService.findAll(query);
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
