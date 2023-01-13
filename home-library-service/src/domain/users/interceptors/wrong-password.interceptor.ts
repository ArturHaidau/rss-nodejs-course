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

@Injectable()
export class WrongPasswordInterceptor implements NestInterceptor {
    constructor(private readonly loggingService: LoggingService) {
        this.loggingService.setContext(WrongPasswordInterceptor.name);
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof WrongPasswordError) {
                    this.loggingService.error(error.stack ?? error.message);
                    return throwError(() => new ForbiddenException(error));
                } else return throwError(() => error);
            }),
        );
    }
}
