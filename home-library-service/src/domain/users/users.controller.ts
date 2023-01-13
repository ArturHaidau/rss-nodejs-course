import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersInterceptor } from './interceptors/users.interceptor';
import { UsersService } from './users.service';
import {
    FindOneParams,
    RemoveByIdParams,
    UpdatePasswordParams,
} from './validation.controller';

@UseGuards(AccessTokenGuard)
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @UseInterceptors(UsersInterceptor)
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params: FindOneParams) {
        return await this.usersService.findOne(params.id);
    }

    @Put(':id')
    @UseInterceptors(UsersInterceptor)
    async updatePassword(
        @Param() params: UpdatePasswordParams,
        @Body() updateUserDto: UpdatePasswordDto,
    ) {
        return await this.usersService.updatePassword(params.id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param() params: RemoveByIdParams) {
        await this.usersService.remove(params.id);
    }
}
