import { LogLevel } from '@nestjs/common';

export const BYTES_IN_KB = 1000;
export const LOGGING_LEVELS: LogLevel[] = [
    'error',
    'warn',
    'log',
    'debug',
    'verbose',
];
