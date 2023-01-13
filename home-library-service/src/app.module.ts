import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DomainModule } from './domain/domain.module';
import { DatabaseModule } from './database/database.module';
import { LoggingModule } from './logging/logging.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { NotFoundInterceptor } from './interceptors/not-found.interceptor';
import { RequestLoggingInterceptor } from './interceptors/request-logging.interceptor';
import { ResponseLoggingInterceptor } from './interceptors/response-logging.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DomainModule,
        DatabaseModule,
        LoggingModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: NotFoundInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: RequestLoggingInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseLoggingInterceptor,
        },
    ],
})
export class AppModule {}
