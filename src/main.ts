import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { NotFoundInterceptor } from './interceptors/not-found.interceptor';

const DEFAULT_PORT = 4000;

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
    );
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useGlobalInterceptors(new NotFoundInterceptor());
    await app.listen(app.get(ConfigService).get('PORT') ?? DEFAULT_PORT);
}

bootstrap().then(() => {
    console.log('Application started successfully');
});
