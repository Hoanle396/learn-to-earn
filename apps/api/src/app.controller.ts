import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { DOPConfig } from './configs';

@ApiTags('health')
@Controller('health')
export class AppController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly configService: ConfigService<DOPConfig>,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  @ApiOkResponse({
    description: '200 when healthy',
  })
  @ApiOperation({
    summary: 'Check server health.',
    description: 'Checks are all of the components healthy and returns 200 if yes.',
  })
  check() {
    return this.health.check([
      () => this.http.pingCheck('rpc', this.configService.get('contract.rpcEndpoint', { infer: true }) + 'health'),
      () => this.db.pingCheck('database'),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
  }
}
