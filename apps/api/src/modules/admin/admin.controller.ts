import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { QueryPaginationDto } from '@/shared/dto/pagination.query';
import { RoleEnum } from '@/shared/enums';
import type { FetchResult } from '@/utils/paginate';

import { Roles } from '@/common/decorators/roles.decorator';
import { GetUser } from '@/common/decorators/user.decorator';
import { Admin } from '@/databases/entities';
import { AdminJwtGuard } from '../auth/guards/admin_jwt.guard';
import { AdminService } from './admin.service';
import { CreateAdminDto, QueryAdminDto, UpdateAdminDto } from './dto/admin.dto';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(AdminJwtGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('me')
  @UseGuards(AdminJwtGuard)
  async getMe(@GetUser() admin: Admin): Promise<Admin> {
    return admin;
  }

  @Get('list-roles')
  @Roles(RoleEnum.SUPER_ADMIN)
  async getListRoles(): Promise<RoleEnum[]> {
    return Object.values(RoleEnum);
  }

  @Post('')
  @Roles(RoleEnum.SUPER_ADMIN)
  async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminService.create(createAdminDto);
  }

  @Get('')
  @Roles(RoleEnum.SUPER_ADMIN)
  async getAdmins(@Query() query: QueryAdminDto, @Query() pagination: QueryPaginationDto): Promise<FetchResult<Admin>> {
    return await this.adminService.find(query, pagination);
  }

  @Get(':id')
  @Roles(RoleEnum.SUPER_ADMIN)
  async getAdmin(@Query('id') id: number): Promise<Admin> {
    return await this.adminService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.SUPER_ADMIN)
  async updateAdmin(@Query('id') id: number, @Body() updateAdminDto: UpdateAdminDto): Promise<Admin> {
    return await this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.SUPER_ADMIN)
  async deleteAdmin(@Query('id') id: number): Promise<Admin> {
    return await this.adminService.delete(id);
  }
}
