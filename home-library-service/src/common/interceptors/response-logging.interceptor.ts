import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggingService } from '../../logging/logging.service';

@Injectable()
export class ResponseLoggingInterceptor implements NestInterceptor {
    constructor(private readonly loggingService: LoggingService) {
        this.loggingService.setContext(ResponseLoggingInterceptor.name);
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap({
                complete: async () => {
                    this.loggingService.log(
                        `Status code - ${
                            context.switchToHttp().getResponse().statusCode
                        }`,
                    );
                },
            }),
        );
    }
}
