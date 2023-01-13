import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
    constructor(private readonly loggingService: LoggingService) {
        this.loggingService.setContext(RequestLoggingInterceptor.name);
    }

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        this.loggingService.log(
            `Request id - ${request.id}, Method - ${request.method}, URL - ${
                request.url
            }, Body - ${JSON.stringify(request.body)}`,
        );
        return next.handle();
    }
}
