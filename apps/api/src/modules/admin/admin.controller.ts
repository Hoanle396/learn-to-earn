import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/admin_roles.decorator';
import { GetUser } from 'src/common/decorators/user.decorator';
import { Admin } from 'src/database/entities';
import { RoleEnum, SwaggerOperationEnum } from 'src/shared/enums';

import { AdminJwtGuard } from '../auth/guards/admin_jwt.guard';
import { AdminService } from './admin.service';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: SwaggerOperationEnum.ADMIN })
  @Get('me')
  @UseGuards(AdminJwtGuard)
  async getMe(@GetUser() admin: Admin): Promise<Admin> {
    return admin;
  }

  @ApiOperation({ summary: SwaggerOperationEnum.SUPER_ADMIN })
  @Get('list-roles')
  @Roles(RoleEnum.SUPER_ADMIN)
  async getListRoles(): Promise<RoleEnum[]> {
    return Object.values(RoleEnum);
  }
}
