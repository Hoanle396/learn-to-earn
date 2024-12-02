import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminJwtGuard } from '../auth/guards/admin_jwt.guard';
import { QueryPaginationDto } from '@/shared/dto/pagination.query';

@ApiTags('Lesson')
@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  async create(@Body() dto: CreateLessonDto) {
    return await this.lessonService.create(dto);
  }

  @Post('bulk/:id')
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  async bulkCreate(@Param('id') id: number, @Body() dto: CreateLessonDto[]) {
    return await this.lessonService.bulkCreate(id, dto);
  }

  @Get('course/:id')
  async findAll(@Param('id') id: number, @Query() query: QueryPaginationDto) {
    return await this.lessonService.findAll(id, query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.lessonService.findOne(id);
  }
}
