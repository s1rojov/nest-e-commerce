import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const res: any = exception.getResponse();
    const errorResponse: any = {
      code: status,
      timestamp: new Date().toLocaleString(),
      method: request.method,
      message:
        status !== (HttpStatus.INTERNAL_SERVER_ERROR as number)
          ? res.message || res || exception.message
          : 'Interval server error',
    };

    return response.status(status).json(errorResponse);
  }
}
