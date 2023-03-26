import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception.getResponse() as any;
    const errors = exceptionResponse?.message ?? exceptionResponse;

    const defaultMessage = Array.isArray(errors) ? errors?.[0] : exception.message;
    let customMessage: string;

    switch (exception.getStatus()) {
      case HttpStatus.UNAUTHORIZED:
        customMessage = 'Unauthorized';
        break;

      default:
        break;
    }

    response.status(status).json({
      success: false,
      message: defaultMessage || customMessage,
      errors: errors || customMessage,
    });
  }
}
