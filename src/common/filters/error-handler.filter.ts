import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Map status codes to error names
    const errorNames: { [key: number]: string } = {
      400: 'Bad Request or Validation Failed',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict: Duplicate Entry',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
      504: 'Gateway Timeout',
    };

    // Get the error name based on status or use a generic name
    let errorName = errorNames[status] || 'Unknown Error';
    let messages = [exception.message] || ['Internal server error'];

    // Handle ValidationPipe errors (BadRequestException with validation errors)
    if (exception instanceof BadRequestException) {
      const responseMessage = exception.getResponse();

      // Check if it is a validation error by looking for `message` as an array
      if (
        responseMessage &&
        typeof responseMessage === 'object' &&
        Array.isArray(responseMessage['message'])
      ) {
        errorName = 'Validation Failed';
        messages = responseMessage['message']; // This will be the array of validation error messages
      }
    }

    // Handle CORS-specific message
    if (exception.message === 'Origin not allowed by CORS') {
      messages = ['Origin not allowed by CORS'];
    }

    // Format the response
    response.status(status).json({
      statusCode: status,
      error: errorName,
      messages,
      method: request.method,
      path: request.url,
      origin: request.headers.origin || 'N/A',
      timestamp: new Date().toISOString(),
    });
  }
}
