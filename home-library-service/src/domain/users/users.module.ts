import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { LoggingModule } from '../../logging/logging.module';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [ConfigModule, LoggingModule, TypeOrmModule.forFeature([User])],
    exports: [UsersService],
})
export class UsersModule {}
