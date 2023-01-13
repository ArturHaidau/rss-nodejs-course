import { LogLevel } from '@nestjs/common';

export const BYTES_IN_KB = 1000;
export const DEFAULT_MAX_LOGGING_FILE_SIZE_IN_KB = 3;
export const DEFAULT_LOGS_DIRECTORY = '/logs';
export const LOGGING_LEVELS: LogLevel[] = [
    'error',
    'warn',
    'log',
    'debug',
    'verbose',
];
