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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
    FindOneParams,
    RemoveParams,
    UpdateParams,
} from './validation.controller';

@Controller('artist')
export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) {}

    @Post()
    create(@Body() createArtistDto: CreateArtistDto) {
        return this.artistsService.create(createArtistDto);
    }

    @Get()
    findAll() {
        return this.artistsService.findAll();
    }

    @Get(':id')
    findOne(@Param() params: FindOneParams) {
        return this.artistsService.findOne(params.id);
    }

    @Put(':id')
    update(
        @Param() params: UpdateParams,
        @Body() updateArtistDto: UpdateArtistDto,
    ) {
        return this.artistsService.update(params.id, updateArtistDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param() params: RemoveParams) {
        this.artistsService.remove(params.id);
    }
}
