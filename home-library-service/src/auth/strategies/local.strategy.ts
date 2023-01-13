import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { EntityNotFoundError } from '../../common/errors/entity-not-found.error';
import { User } from '../../domain/users/entities/user.entity';
import { WrongPasswordError } from '../../domain/users/errors/wrong-password.error';
import { LoggingService } from '../../logging/logging.service';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        private readonly authService: AuthService,
        private readonly loggingService: LoggingService,
    ) {
        super({
            usernameField: 'login',
            passwordField: 'password',
        });
        this.loggingService.setContext(LocalStrategy.name);
    }

    async validate(username: string, password: string): Promise<User> {
        try {
            return await this.authService.validateUser(username, password);
        } catch (error) {
            if (
                error instanceof WrongPasswordError ||
                error instanceof EntityNotFoundError
            ) {
                this.loggingService.error(error.stack ?? error.message);
                throw new ForbiddenException(error);
            } else throw error;
        }
    }
}
