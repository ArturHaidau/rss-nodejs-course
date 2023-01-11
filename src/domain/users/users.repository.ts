import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityNotFoundError } from '../../errors/entity-not-found.error';

@Injectable()
export class UsersRepository {
    private readonly users: User[] = [];

    create(createUserDto: CreateUserDto) {
        const timestamp = Date.now();
        const newUser = {
            id: crypto.randomUUID(),
            version: 0,
            createdAt: timestamp,
            updatedAt: timestamp,
            ...createUserDto,
        };
        this.users.push(newUser);
        return newUser;
    }

    findOne(id: string) {
        return this.findUser(id).user;
    }

    findAll() {
        return this.users;
    }

    remove(id: string) {
        const { index } = this.findUser(id);
        this.users.splice(index, 1);
    }

    update(user: User) {
        const { index } = this.findUser(user.id);
        this.users[index] = {
            ...user,
            version: user.version + 1,
            updatedAt: Date.now(),
        };
        return this.users[index];
    }

    private findUser(id: string) {
        const index = this.users.findIndex((x) => x.id === id);
        if (index === -1)
            throw new EntityNotFoundError(`User with id = ${id} not found`);
        else return { index, user: this.users[index] };
    }
}
