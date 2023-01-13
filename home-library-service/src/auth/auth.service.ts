import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WrongPasswordError } from '../domain/users/errors/wrong-password.error';
import { User } from '../domain/users/entities/user.entity';
import { UsersService } from '../domain/users/users.service';
import { LoggingService } from '../logging/logging.service';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from './entities/jwt-payload.entity';
import { RefreshTokenError } from './errors/refresh-token.error';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly loggingService: LoggingService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
        this.loggingService.setContext(AuthService.name);
    }

    async signup(authDto: AuthDto) {
        await this.usersService.create(authDto);
    }

    async login(authDto: AuthDto) {
        const { login, id: userId } = await this.usersService.findOneByLogin(
            authDto.login,
        );
        const tokens = await this.getTokens({
            userId,
            login,
        });
        await this.usersService.updateRefreshToken(userId, tokens.refreshToken);
        return tokens;
    }

    async refreshTokens(refreshToken: string) {
        this.validateRefreshToken(refreshToken);
        const { userId } = this.jwtService.decode(refreshToken) as JwtPayload;
        const user = await this.usersService.findOne(userId);
        if (!this.usersService.refreshTokenMatches(user, refreshToken))
            throw new RefreshTokenError('Refresh token is not valid');
        const tokens = await this.getTokens({
            userId: user.id,
            login: user.login,
        });
        await this.usersService.updateRefreshToken(
            user.id,
            tokens.refreshToken,
        );
        return tokens;
    }

    async validateUser(username: string, password: string): Promise<User> {
        console.log(password);
        const user = await this.usersService.findOneByLogin(username);
        if (user.password === this.usersService.hashData(password)) return user;
        else
            throw new WrongPasswordError(
                'Wrong password provided for logging in',
            );
    }

    private validateRefreshToken(refreshToken: string) {
        try {
            this.jwtService.verify(refreshToken, {
                secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
            });
        } catch (error) {
            this.loggingService.error(error.stack ?? error.message);
            throw new RefreshTokenError(error.message);
        }
    }

    private async getTokens(payload: JwtPayload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
            }),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
