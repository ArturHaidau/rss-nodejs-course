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
    get() {
        return this.favoritesService.get();
    }

    @Post('artist/:id')
    @UseInterceptors(new NotFoundInterceptor())
    addArtist(@Param() { id }: FavoritesDto) {
        this.favoritesService.addArtist(id);
        return { message: `Artist with id = ${id} added to favorites` };
    }

    @Post('track/:id')
    @UseInterceptors(new NotFoundInterceptor())
    addTrack(@Param() { id }: FavoritesDto) {
        this.favoritesService.addTrack(id);
        return { message: `Track with id = ${id} added to favorites` };
    }

    @Post('album/:id')
    @UseInterceptors(new NotFoundInterceptor())
    addAlbum(@Param() { id }: FavoritesDto) {
        this.favoritesService.addAlbum(id);
        return { message: `Album with id = ${id} added to favorites` };
    }

    @Delete('artist/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeArtist(@Param() { id }: FavoritesDto) {
        this.favoritesService.removeArtist(id);
    }

    @Delete('track/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeTrack(@Param() { id }: FavoritesDto) {
        this.favoritesService.removeTrack(id);
    }

    @Delete('album/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeAlbum(@Param() { id }: FavoritesDto) {
        this.favoritesService.removeAlbum(id);
    }
}
