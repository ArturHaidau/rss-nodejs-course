import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggingService } from '../logging/logging.service';

@Catch(Error)
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly loggingService: LoggingService,
    ) {
        this.loggingService.setContext(AllExceptionsFilter.name);
    }

    catch(exception: Error, host: ArgumentsHost): void {
        this.loggingService.error(exception.stack ?? exception.message);
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const [statusCode, message] =
            exception instanceof HttpException
                ? [exception.getStatus(), exception.message]
                : [HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error'];
        httpAdapter.reply(ctx.getResponse(), { message }, statusCode);
        this.loggingService.error(`Status code - ${statusCode}`);
    }
}
