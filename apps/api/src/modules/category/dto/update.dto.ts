import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
