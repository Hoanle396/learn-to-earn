import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
