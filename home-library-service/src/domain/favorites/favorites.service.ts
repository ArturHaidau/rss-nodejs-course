import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from '../../common/errors/entity-not-found.error';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteAlbum } from './entities/favorite-album.entity';
import { FavoriteArtist } from './entities/favorite-artist.entity';
import { FavoriteTrack } from './entities/favorite-track.entity';

@Injectable()
export class FavoritesService {
    constructor(
        private readonly artistsService: ArtistsService,
        private readonly albumsService: AlbumsService,
        private readonly tracksService: TracksService,
        @InjectRepository(FavoriteAlbum)
        private readonly favoriteAlbumsRepository: Repository<FavoriteAlbum>,
        @InjectRepository(FavoriteArtist)
        private readonly favoriteArtistsRepository: Repository<FavoriteArtist>,
        @InjectRepository(FavoriteTrack)
        private readonly favoriteTracksRepository: Repository<FavoriteTrack>,
    ) {}

    async get() {
        const [albums, tracks, artists] = await Promise.all([
            this.favoriteAlbumsRepository.find({ relations: { album: true } }),
            this.favoriteTracksRepository.find({ relations: { track: true } }),
            this.favoriteArtistsRepository.find({
                relations: { artist: true },
            }),
        ]);
        return {
            albums: albums.map((x) => x.album),
            artists: artists.map((x) => x.artist),
            tracks: tracks.map((x) => x.track),
        };
    }

    async addArtist(id: string) {
        const artist = await this.favoriteArtistsRepository.findOne({
            where: { artist: { id } },
            relations: { artist: true },
        });
        if (!artist)
            await this.favoriteArtistsRepository.save(
                this.favoriteArtistsRepository.create({
                    artist: await this.artistsService.findOne(id),
                }),
            );
    }

    async addTrack(id: string) {
        const track = await this.favoriteTracksRepository.findOne({
            where: { track: { id } },
            relations: { track: true },
        });
        if (!track)
            await this.favoriteTracksRepository.save(
                this.favoriteTracksRepository.create({
                    track: await this.tracksService.findOne(id),
                }),
            );
    }

    async addAlbum(id: string) {
        const album = await this.favoriteAlbumsRepository.findOne({
            where: { album: { id } },
            relations: { album: true },
        });
        if (!album)
            await this.favoriteAlbumsRepository.save(
                this.favoriteAlbumsRepository.create({
                    album: await this.albumsService.findOne(id),
                }),
            );
    }

    async removeArtist(id: string) {
        const favoriteArtist = await this.favoriteArtistsRepository.findOne({
            where: { artist: { id } },
            relations: { artist: true },
        });
        if (favoriteArtist)
            await this.favoriteArtistsRepository.remove(favoriteArtist);
        else
            throw new EntityNotFoundError(
                `Artist with id = ${id} is not in favorites`,
            );
    }

    async removeTrack(id: string) {
        const favoriteTrack = await this.favoriteTracksRepository.findOne({
            where: { track: { id } },
            relations: { track: true },
        });
        if (favoriteTrack)
            await this.favoriteTracksRepository.remove(favoriteTrack);
        else
            throw new EntityNotFoundError(
                `Track with id = ${id} is not in favorites`,
            );
    }

    async removeAlbum(id: string) {
        const favoriteAlbum = await this.favoriteAlbumsRepository.findOne({
            where: { album: { id } },
            relations: { album: true },
        });
        if (favoriteAlbum)
            await this.favoriteAlbumsRepository.remove(favoriteAlbum);
        else
            throw new EntityNotFoundError(
                `Album with id = ${id} is not in favorites`,
            );
    }
}
