import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ValidateRefreshTokenGuard } from './guards/validate-refresh-token.guard';
import { ValidateUserGuard } from './guards/validate-user.guard';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { UserExistsInterceptor } from './interceptors/user-exists.interceptor';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseInterceptors(UserExistsInterceptor)
    @Post('signup')
    async signup(@Body() authDto: AuthDto) {
        await this.authService.signup(authDto);
        return { message: 'User created successfully' };
    }

    @UseGuards(ValidateUserGuard, LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() authDto: AuthDto) {
        return this.authService.login(authDto);
    }

    @UseGuards(ValidateRefreshTokenGuard)
    @UseInterceptors(RefreshTokenInterceptor)
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    refresh(@Body() { refreshToken }: RefreshTokenDto) {
        return this.authService.refreshTokens(refreshToken);
    }
}
