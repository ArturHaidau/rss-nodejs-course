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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
    FindOneParams,
    RemoveParams,
    UpdateParams,
} from './validation.controller';

@UseGuards(AccessTokenGuard)
@Controller('artist')
export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) {}

    @Post()
    async create(@Body() createArtistDto: CreateArtistDto) {
        return await this.artistsService.create(createArtistDto);
    }

    @Get()
    async findAll() {
        return await this.artistsService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params: FindOneParams) {
        return await this.artistsService.findOne(params.id);
    }

    @Put(':id')
    async update(
        @Param() params: UpdateParams,
        @Body() updateArtistDto: UpdateArtistDto,
    ) {
        return await this.artistsService.update(params.id, updateArtistDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param() params: RemoveParams) {
        await this.artistsService.remove(params.id);
    }
}
