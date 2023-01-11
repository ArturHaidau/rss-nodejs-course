import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { EntityNotFoundError } from '../../../errors/entity-not-found.error';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof EntityNotFoundError)
                    throw new UnprocessableEntityException(error.message);
                else throw error;
            }),
        );
    }
}
