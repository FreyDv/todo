import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { EntityNotFoundException } from '../exceptions/entity-not-found.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = exception.getStatus();
    let msg = '';

    if (exception instanceof EntityNotFoundException) {
      msg = exception.message + ':)';
      status = HttpStatus.NOT_FOUND;
    }

    response.status(status).json({
      statusCode: status,
      msg,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
