import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac } from 'crypto';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from '../../errors/entity-not-found.error';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { WrongPasswordError } from './errors/wrong-password.error';

const DEFAULT_HMAC = 'as89d791232451345787';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly configService: ConfigService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        return UsersService.omitPassword(
            await this.usersRepository.save(
                this.usersRepository.create({
                    ...createUserDto,
                    password: this.getPasswordHMAC(createUserDto.password),
                }),
            ),
        );
    }

    async findAll() {
        return UsersService.omitPassword(await this.usersRepository.find());
    }

    async findOne(id: string) {
        return UsersService.omitPassword(await this.findById(id));
    }

    async remove(id: string) {
        const user = await this.findById(id);
        await this.usersRepository.remove(user);
    }

    async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
        if (
            (await this.findById(id)).password !==
            this.getPasswordHMAC(updatePasswordDto.oldPassword)
        )
            throw new WrongPasswordError(
                'Wrong password provided for updating password operation',
            );
        else {
            await this.usersRepository.update(id, {
                password: this.getPasswordHMAC(updatePasswordDto.newPassword),
            });
            return UsersService.omitPassword(await this.findById(id));
        }
    }

    private static omitPassword(data: User | Array<User>) {
        const omit = ({ password, ...rest }: { password: string }) => ({
            ...rest,
        });

        return Array.isArray(data) ? data.map(omit) : omit(data);
    }

    private async findById(id: string) {
        const user = await this.usersRepository.findOneBy({ id });
        if (user) return user;
        else throw new EntityNotFoundError(`User with id = ${id} not found`);
    }

    private getPasswordHMAC(password: string) {
        return createHmac(
            'sha256',
            this.configService.get('HMAC_SECRET') ?? DEFAULT_HMAC,
        )
            .update(password)
            .digest('hex');
    }
}
