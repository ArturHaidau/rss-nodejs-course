import {
    CallHandler,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { UserExistsError } from '../../domain/users/errors/user-exists.error';
import { LoggingService } from '../../logging/logging.service';

@Injectable()
export class UserExistsInterceptor implements NestInterceptor {
    constructor(private readonly loggingService: LoggingService) {
        this.loggingService.setContext(UserExistsInterceptor.name);
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof UserExistsError) {
                    this.loggingService.error(error.stack ?? error.message);
                    return throwError(() => new ForbiddenException(error));
                } else return throwError(() => error);
            }),
        );
    }
}
