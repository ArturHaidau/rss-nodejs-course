import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { ConfigModule } from '@nestjs/config';
import { FileLoggingService } from './file-logging.service';

@Module({
    imports: [ConfigModule],
    providers: [LoggingService, FileLoggingService],
    exports: [LoggingService],
})
export class LoggingModule {}
