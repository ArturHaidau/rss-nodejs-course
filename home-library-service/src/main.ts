import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { LoggingService } from './logging/logging.service';

const DEFAULT_PORT = 4000;

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
        { bufferLogs: true },
    );
    const loggingService = await app.resolve(LoggingService);
    app.useLogger(loggingService);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    process.on('uncaughtException', (error, origin) => {
        loggingService.error(
            `Caught exception: ${error}, Exception origin: ${origin}`,
        );
    });
    process.on('unhandledRejection', (reason, promise) => {
        loggingService.error(
            `Unhandled Rejection at: ${promise} reason: ${reason}`,
        );
    });

    await app.listen(
        app.get(ConfigService).get('PORT') ?? DEFAULT_PORT,
        '0.0.0.0',
    );
}

bootstrap().then(() => {
    console.log('Application started successfully');
});
