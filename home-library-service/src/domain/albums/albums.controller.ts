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
} from '@nestjs/common';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
    FindOneParams,
    RemoveParams,
    UpdateParams,
} from './validation.controller';

@UseGuards(AccessTokenGuard)
@Controller('album')
export class AlbumsController {
    constructor(private readonly albumsService: AlbumsService) {}

    @Post()
    async create(@Body() createAlbumDto: CreateAlbumDto) {
        return await this.albumsService.create(createAlbumDto);
    }

    @Get()
    async findAll() {
        return await this.albumsService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params: FindOneParams) {
        return await this.albumsService.findOne(params.id);
    }

    @Put(':id')
    async update(
        @Param() params: UpdateParams,
        @Body() updateAlbumDto: UpdateAlbumDto,
    ) {
        return await this.albumsService.update(params.id, updateAlbumDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param() params: RemoveParams) {
        await this.albumsService.remove(params.id);
    }
}
