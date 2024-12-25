import type { ArgumentsHost, ExceptionFilter as ExceptionFilterBase } from '@nestjs/common';
import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from 'hidrajs-winston-logger';

const logger = new Logger('ExceptionFilter');

function processMessage(exception: any): string {
  let message: any = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';
  if (typeof message === 'object') {
    message = message.message ? message.message : message.error || message;
  }
  return message;
}

@Catch()
export class ExceptionFilter<T> implements ExceptionFilterBase {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const body = `Body: ${JSON.stringify(request.body)}`;
    const query = `Query: ${JSON.stringify(request.query)}`;
    const params = `Params: ${JSON.stringify(request.params)}`;
    const endpoint = `❌ Endpoint: ${request.method} ${request.url} 💔 ${status}`;

    logger.error(endpoint);
    logger.error(body);
    logger.error(query);
    logger.error(params);
    logger.error(exception);

    const message = processMessage(exception);

    return response.status(status).json({
      meta: {
        code: status,
        message,
      },
      data: null,
    });
  }
}
