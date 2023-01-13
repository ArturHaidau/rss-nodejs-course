import {
    CallHandler,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { WrongPasswordError } from '../errors/wrong-password.error';

@Injectable()
export class WrongPasswordInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof WrongPasswordError)
                    throw new ForbiddenException(error.message);
                else throw error;
            }),
        );
    }
}
