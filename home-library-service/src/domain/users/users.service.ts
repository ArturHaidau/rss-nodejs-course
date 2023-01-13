import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac } from 'crypto';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from '../../common/errors/entity-not-found.error';
import { WrongPasswordError } from './errors/wrong-password.error';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { UserExistsError } from './errors/user-exists.error';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly configService: ConfigService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const user = await this.usersRepository.findOneBy({
            login: createUserDto.login,
        });
        if (user)
            throw new UserExistsError(
                `User with login = ${createUserDto.login} already exists`,
            );
        else
            return UsersService.omitFields(
                await this.usersRepository.save(
                    this.usersRepository.create({
                        ...createUserDto,
                        password: this.hashData(createUserDto.password),
                    }),
                ),
            ) as User;
    }

    async findAll() {
        return UsersService.omitFields(await this.usersRepository.find());
    }

    async findOne(id: string) {
        return UsersService.omitFields(await this.findById(id)) as User;
    }

    async remove(id: string) {
        const user = await this.findById(id);
        await this.usersRepository.remove(user);
    }

    async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
        if (
            (await this.findById(id)).password !==
            this.hashData(updatePasswordDto.oldPassword)
        )
            throw new WrongPasswordError(
                'Wrong password provided for updating password operation',
            );
        else {
            await this.usersRepository.update(id, {
                password: this.hashData(updatePasswordDto.newPassword),
            });
            return UsersService.omitFields(await this.findById(id));
        }
    }

    async updateRefreshToken(id: string, newRefreshToken: string) {
        await this.usersRepository.update(id, {
            refreshToken: this.hashData(newRefreshToken),
        });
    }

    async findOneByLogin(login: string) {
        const user = await this.usersRepository.findOneBy({ login });
        if (user) return user;
        else
            throw new EntityNotFoundError(
                `User with login = ${login} not found`,
            );
    }

    refreshTokenMatches(user: User, refreshToken: string) {
        return user.refreshToken === this.hashData(refreshToken);
    }

    hashData(data: string) {
        return createHmac(
            'sha256',
            this.configService.getOrThrow('HMAC_SECRET'),
        )
            .update(data)
            .digest('hex');
    }

    private static omitFields(data: User | Array<User>) {
        const omit = ({
            password,
            refreshToken,
            ...rest
        }: {
            password: string;
            refreshToken: string;
        }) => ({
            ...rest,
        });

        return Array.isArray(data) ? data.map(omit) : omit(data);
    }

    private async findById(id: string) {
        const user = await this.usersRepository.findOneBy({ id });
        if (user) return user;
        else throw new EntityNotFoundError(`User with id = ${id} not found`);
    }
}
