import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { WriteStream } from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import {
    BYTES_IN_KB,
    DEFAULT_LOGS_DIRECTORY,
    DEFAULT_MAX_LOGGING_FILE_SIZE_IN_KB,
} from './logging.constants';

interface LogStream {
    stream: WriteStream;
    bytesSent: number;
}

@Injectable()
export class FileLoggingService {
    private readonly maxFileSize: number;
    private readonly directory: string;

    private static logStream: LogStream;
    private static errorStream: LogStream;

    constructor(private readonly configService: ConfigService) {
        this.maxFileSize =
            (Number(this.configService.get('MAX_LOGGING_FILE_SIZE_IN_KB')) ??
                DEFAULT_MAX_LOGGING_FILE_SIZE_IN_KB) * BYTES_IN_KB;
        this.directory = path.join(
            process.cwd(),
            this.configService.get('LOGS_DIRECTORY') ?? DEFAULT_LOGS_DIRECTORY,
        );
    }

    log(data: string) {
        FileLoggingService.logStream = this.getStream(
            FileLoggingService.logStream,
            `${Date.now()}.log`,
            data.length,
        );
        FileLoggingService.write(data, FileLoggingService.logStream);
    }

    error(data: string) {
        FileLoggingService.errorStream = this.getStream(
            FileLoggingService.errorStream,
            `${Date.now()}.errors.log`,
            data.length,
        );
        FileLoggingService.write(data, FileLoggingService.errorStream);
    }

    private getStream(
        currentLogStream: LogStream,
        fileName: string,
        dataSize: number,
    ) {
        if (dataSize > this.maxFileSize)
            throw new Error(
                `Log size (${dataSize} bytes) exceeds max log file size (${this.maxFileSize} bytes)`,
            );
        let logStream = currentLogStream;
        if (!logStream) logStream = this.createLogStream(fileName);
        else if (logStream.bytesSent + dataSize > this.maxFileSize)
            logStream = this.createLogStream(fileName);
        return logStream;
    }

    private createLogStream(fileName: string) {
        return {
            bytesSent: 0,
            stream: fs.createWriteStream(path.join(this.directory, fileName)),
        };
    }

    private static write(data: string, logStream: LogStream) {
        const pushedData = data + '\n';
        logStream.stream.write(pushedData);
        logStream.bytesSent += pushedData.length;
    }
}
