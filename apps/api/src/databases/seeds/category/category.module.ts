import { Category } from '@/databases/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorySeedService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategorySeedService],
  exports: [CategorySeedService],
})
export class CategorySeedModule { }
