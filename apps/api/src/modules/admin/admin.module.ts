import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin, User } from '@/databases/entities';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, User])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule { }
