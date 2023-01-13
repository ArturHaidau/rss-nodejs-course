import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ValidateRefreshTokenGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const { refreshToken } = context.switchToHttp().getRequest().body;
        if (!(typeof refreshToken === 'string'))
            throw new UnauthorizedException(
                'No refresh token found. Expected {refreshToken: string}',
            );
        return true;
    }
}
