import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { EntityNotFoundError } from '../../../common/errors/entity-not-found.error';
import { LoggingService } from '../../../logging/logging.service';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
    constructor(private readonly loggingService: LoggingService) {
        this.loggingService.setContext(NotFoundInterceptor.name);
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof EntityNotFoundError) {
                    this.loggingService.error(error.stack ?? error.message);
                    return throwError(
                        () => new UnprocessableEntityException(error),
                    );
                } else return throwError(() => error);
            }),
        );
    }
}
