import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';

@Injectable()
export class ValidateUserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const { login, password } = context.switchToHttp().getRequest().body;
        if (!(typeof login === 'string' && typeof password === 'string'))
            throw new BadRequestException(
                'Invalid body. Expected {login: string, password: string}',
            );
        return true;
    }
}
