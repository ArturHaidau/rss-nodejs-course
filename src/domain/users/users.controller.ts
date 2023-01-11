import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { WrongPasswordError } from './errors/wrong-password.error';
import {
    FindOneParams,
    RemoveByIdParams,
    UpdatePasswordParams,
} from './validation.controller';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param() params: FindOneParams) {
        return this.usersService.findOne(params.id);
    }

    @Put(':id')
    updatePassword(
        @Param() params: UpdatePasswordParams,
        @Body() updateUserDto: UpdatePasswordDto,
    ) {
        try {
            return this.usersService.updatePassword(params.id, updateUserDto);
        } catch (e) {
            if (e instanceof WrongPasswordError)
                throw new ForbiddenException(e.message);
            else throw e;
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param() params: RemoveByIdParams) {
        this.usersService.remove(params.id);
    }
}
