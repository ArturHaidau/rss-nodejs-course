import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { WrongPasswordError } from './errors/wrong-password.error';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    create(createUserDto: CreateUserDto) {
        return UsersService.omitPassword(
            this.usersRepository.create(createUserDto),
        );
    }

    findAll() {
        return UsersService.omitPassword(this.usersRepository.findAll());
    }

    findOne(id: string) {
        return UsersService.omitPassword(this.usersRepository.findOne(id));
    }

    remove(id: string) {
        this.usersRepository.remove(id);
    }

    updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
        const user = this.usersRepository.findOne(id);
        if (user.password !== updatePasswordDto.oldPassword)
            throw new WrongPasswordError(
                'Wrong password provided for updating password operation',
            );
        else {
            return UsersService.omitPassword(
                this.usersRepository.update({
                    ...user,
                    password: updatePasswordDto.newPassword,
                } as User),
            );
        }
    }

    private static omitPassword(data: User | Array<User>) {
        const omit = ({ password, ...rest }: { password: string }) => ({
            ...rest,
        });

        return Array.isArray(data) ? data.map(omit) : omit(data);
    }
}
