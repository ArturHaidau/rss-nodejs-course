import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../domain/users/users.module';
import { LoggingModule } from '../logging/logging.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, AccessTokenStrategy],
    imports: [
        ConfigModule,
        LoggingModule,
        UsersModule,
        PassportModule,
        JwtModule.register({}),
    ],
})
export class AuthModule {}
