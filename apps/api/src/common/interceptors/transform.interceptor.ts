import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../interfaces/response';

const logger = new Logger(class DOPApplication {}.name);

function processResponseData(data: any, statusCode?: number): any {
  return {
    meta: {
      code: data?.statusCode || statusCode,
      message: data?.message || 'Successful',
    },
    data: data?.results || data,
  };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
    const { statusCode, req } = context.switchToHttp().getResponse();

    return next
      .handle()
      .pipe(
        map(
          (data) => (
            logger.verbose(`💚 Endpoint: ${req.method} ${req.url} 🔥 Response Status Code: ${statusCode}`),
            processResponseData(data, statusCode)
          )
        )
      );
  }
}
