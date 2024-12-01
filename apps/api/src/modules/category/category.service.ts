import { Category } from '@/databases/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create.dto';
import { QueryPaginationDto } from '@/shared/dto/pagination.query';
import { FetchResult, paginateEntities } from '@/utils/paginate';
import { UpdateCategoryDto } from './dto/update.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const { description, icon, name } = dto;
    return await this.categoryRepository.save({ icon, name, description });
  }

  async getCategories(query: QueryPaginationDto): Promise<FetchResult<Category>> {
    const builder = this.categoryRepository.createQueryBuilder('category');
    return await paginateEntities(builder, query);
  }

  async getCategory(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const { description, icon, name } = dto;
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new Error('Category not found');
    }
    if (icon) category.icon = icon;
    if (name) category.name = name;
    if (description) category.description = description;
    return await this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new Error('Category not found');
    }
    return await this.categoryRepository.softRemove(category);
  }
}
