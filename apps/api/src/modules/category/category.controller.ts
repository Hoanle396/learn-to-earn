import { QueryPaginationDto } from '@/shared/dto/pagination.query';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminJwtGuard } from '../auth/guards/admin_jwt.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.dto';
import { UpdateCategoryDto } from './dto/update.dto';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  @Post('')
  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.createCategory(dto);
  }

  @Get('')
  async getCategories(@Query() query: QueryPaginationDto) {
    return await this.categoryService.getCategories(query);
  }

  @Get(':id')
  async getCategory(@Param('id') id: number) {
    return await this.categoryService.getCategory(id);
  }

  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  @Patch(':id')
  async updateCategory(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return await this.categoryService.updateCategory(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return await this.categoryService.deleteCategory(id);
  }
}
