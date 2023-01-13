import {
    CallHandler,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { WrongPasswordError } from '../errors/wrong-password.error';
import { LoggingService } from '../../../logging/logging.service';
import { UserExistsError } from '../errors/user-exists.error';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
    constructor(private readonly loggingService: LoggingService) {
        this.loggingService.setContext(UsersInterceptor.name);
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (
                    error instanceof WrongPasswordError ||
                    error instanceof UserExistsError
                ) {
                    this.loggingService.error(error.stack ?? error.message);
                    return throwError(() => new ForbiddenException(error));
                } else return throwError(() => error);
            }),
        );
    }
}
