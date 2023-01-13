import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NestInterceptor,
    UnauthorizedException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { LoggingService } from '../../logging/logging.service';
import { RefreshTokenError } from '../errors/refresh-token.error';

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
    constructor(private readonly loggingService: LoggingService) {
        this.loggingService.setContext(RefreshTokenInterceptor.name);
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof RefreshTokenError) {
                    this.loggingService.error(error.stack ?? error.message);
                    return throwError(() => new ForbiddenException(error));
                } else if (error instanceof BadRequestException) {
                    this.loggingService.error(error.stack ?? error.message);
                    return throwError(
                        () =>
                            new UnauthorizedException('No refresh token found'),
                    );
                } else return throwError(() => error);
            }),
        );
    }
}
