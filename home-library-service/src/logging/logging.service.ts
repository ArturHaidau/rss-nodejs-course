import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LOGGING_LEVELS } from './logging.constants';
import { FileLoggingService } from './file-logging.service';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
    constructor(
        private readonly configService: ConfigService,
        private readonly fileLoggingService: FileLoggingService,
    ) {
        super();
        this.setLogLevels([LOGGING_LEVELS[configService.get('LOGGING_LEVEL')]]);
    }

    error(message: string, ...optionalParams: string[]) {
        super.error(message, ...optionalParams);
        this.fileLoggingService.error(message);
    }

    log(message: string, ...optionalParams: string[]) {
        super.log(message, ...optionalParams);
        this.fileLoggingService.log(message);
    }

    warn(message: string, ...optionalParams: string[]) {
        super.warn(message, ...optionalParams);
        this.fileLoggingService.log(message);
    }

    debug(message: string, ...optionalParams: string[]) {
        super.debug(message, ...optionalParams);
        this.fileLoggingService.log(message);
    }

    verbose(message: string, ...optionalParams: string[]) {
        super.verbose(message, ...optionalParams);
        this.fileLoggingService.log(message);
    }
}
