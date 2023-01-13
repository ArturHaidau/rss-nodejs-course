import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DomainModule } from './domain/domain.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        ConfigModule.forRoot(),
        EventEmitterModule.forRoot(),
        DomainModule,
    ],
})
export class AppModule {}
