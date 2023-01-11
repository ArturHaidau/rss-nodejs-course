import { Injectable } from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
    constructor(
        private readonly favoritesRepository: FavoritesRepository,
        private readonly artistsService: ArtistsService,
        private readonly albumsService: AlbumsService,
        private readonly tracksService: TracksService,
    ) {}

    get() {
        return this.favoritesRepository.get();
    }

    addArtist(id: string) {
        this.artistsService.findOne(id);
        this.favoritesRepository.addArtist(id);
    }

    addTrack(id: string) {
        this.tracksService.findOne(id);
        this.favoritesRepository.addTrack(id);
    }

    addAlbum(id: string) {
        this.albumsService.findOne(id);
        this.favoritesRepository.addAlbum(id);
    }

    removeArtist(id: string) {
        this.favoritesRepository.removeArtist(id);
    }

    removeTrack(id: string) {
        this.favoritesRepository.removeTrack(id);
    }

    removeAlbum(id: string) {
        this.favoritesRepository.removeAlbum(id);
    }
}
