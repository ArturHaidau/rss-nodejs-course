import {
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesDto } from './dto/favorites.dto';
import { NotFoundInterceptor } from './interceptors/not-found.interceptor';

@Controller('favs')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Get()
    async get() {
        return await this.favoritesService.get();
    }

    @Post('artist/:id')
    @UseInterceptors(NotFoundInterceptor)
    async addArtist(@Param() { id }: FavoritesDto) {
        await this.favoritesService.addArtist(id);
        return { message: `Artist with id = ${id} added to favorites` };
    }

    @Post('track/:id')
    @UseInterceptors(NotFoundInterceptor)
    async addTrack(@Param() { id }: FavoritesDto) {
        await this.favoritesService.addTrack(id);
        return { message: `Track with id = ${id} added to favorites` };
    }

    @Post('album/:id')
    @UseInterceptors(NotFoundInterceptor)
    async addAlbum(@Param() { id }: FavoritesDto) {
        await this.favoritesService.addAlbum(id);
        return { message: `Album with id = ${id} added to favorites` };
    }

    @Delete('artist/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeArtist(@Param() { id }: FavoritesDto) {
        await this.favoritesService.removeArtist(id);
    }

    @Delete('track/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeTrack(@Param() { id }: FavoritesDto) {
        await this.favoritesService.removeTrack(id);
    }

    @Delete('album/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeAlbum(@Param() { id }: FavoritesDto) {
        await this.favoritesService.removeAlbum(id);
    }
}
