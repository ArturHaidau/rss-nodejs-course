import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [ConfigModule, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
