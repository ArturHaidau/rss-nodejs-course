import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { WriteStream } from 'fs';
import * as path from 'path';
import { BYTES_IN_KB } from './logging.constants';

interface LogStream {
    stream: WriteStream;
    bytesSent: number;
}

@Injectable()
export class FileLoggingService {
    private readonly maxFileSize: number;
    private readonly directory: string;

    private logStream: LogStream;
    private errorStream: LogStream;

    constructor(private readonly configService: ConfigService) {
        this.maxFileSize =
            this.configService.getOrThrow<number>(
                'MAX_LOGGING_FILE_SIZE_IN_KB',
            ) * BYTES_IN_KB;
        this.directory = path.join(
            process.cwd(),
            this.configService.getOrThrow('LOGS_DIRECTORY'),
        );
    }

    log(data: string) {
        this.logStream = this.getStream(
            this.logStream,
            `${Date.now()}.log`,
            data.length,
        );
        FileLoggingService.write(data, this.logStream);
    }

    error(data: string) {
        this.errorStream = this.getStream(
            this.errorStream,
            `${Date.now()}.errors.log`,
            data.length,
        );
        FileLoggingService.write(data, this.errorStream);
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
