import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { QueryPaginationDto } from '@/shared/dto/pagination.query';
import { RoleEnum } from '@/shared/enums';
import type { FetchResult } from '@/utils/paginate';

import { Roles } from '@/common/decorators/roles.decorator';
import { GetUser } from '@/common/decorators/user.decorator';
import { Admin, User } from '@/databases/entities';
import { AdminJwtGuard } from '../auth/guards/admin_jwt.guard';
import { AdminService } from './admin.service';
import { CreateAdminDto, QueryAdminDto, UpdateAdminDto } from './dto/admin.dto';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(AdminJwtGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

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

  @Get('users')
  async getUsers(@Query() query: QueryPaginationDto): Promise<FetchResult<User>> {
    return await this.adminService.getUsers(query);
  }

  @Get(':id')
  @Roles(RoleEnum.SUPER_ADMIN)
  async getAdmin(@Query('id') id: number): Promise<Admin> {
    return await this.adminService.findOne(id);
  }

  @Patch('users/:id')
  @ApiOperation({
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                enum: ['active', 'inactive']
              }
            }
          }
        }
      }
    }
  })
  async updateUser(@Param('id') id: number, @Body() dto: { status: 'active' | 'inactive' }): Promise<boolean> {
    return await this.adminService.updateUser(id, dto.status);
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
