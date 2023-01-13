import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import migrations from './migrations';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                logging: true,
                autoLoadEntities: true,
                migrations,
            }),
            dataSourceFactory: async (options) => {
                if (!options)
                    throw new Error('Data source options not provided');
                else {
                    const dataSource = await new DataSource(
                        options,
                    ).initialize();
                    await dataSource.runMigrations();
                    return dataSource;
                }
            },
        }),
    ],
})
export class DatabaseModule {}
