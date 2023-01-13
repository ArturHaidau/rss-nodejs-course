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
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
    FindOneParams,
    RemoveParams,
    UpdateParams,
} from './validation.controller';

@Controller('album')
export class AlbumsController {
    constructor(private readonly albumsService: AlbumsService) {}

    @Post()
    create(@Body() createAlbumDto: CreateAlbumDto) {
        return this.albumsService.create(createAlbumDto);
    }

    @Get()
    findAll() {
        return this.albumsService.findAll();
    }

    @Get(':id')
    findOne(@Param() params: FindOneParams) {
        return this.albumsService.findOne(params.id);
    }

    @Put(':id')
    update(
        @Param() params: UpdateParams,
        @Body() updateAlbumDto: UpdateAlbumDto,
    ) {
        return this.albumsService.update(params.id, updateAlbumDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param() params: RemoveParams) {
        this.albumsService.remove(params.id);
    }
}
