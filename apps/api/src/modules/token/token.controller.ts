import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('token')
@Controller('token')
export class TokenController { }
