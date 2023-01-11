import { Injectable } from '@nestjs/common';
import { Favorites } from './entities/favorite.entity';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { AlbumRemovedPayload } from '../albums/event-payloads/album-removed.payload';
import {
    ALBUM_REMOVED,
    ARTIST_REMOVED,
    TRACK_REMOVED,
} from '../../event-types';
import { EntityNotFoundError } from 'src/errors/entity-not-found.error';
import { TrackRemovedPayload } from '../tracks/event-payloads/track-removed.payload';
import { ArtistRemovedPayload } from '../artists/event-payloads/artist-removed.payload';

@Injectable()
export class FavoritesRepository {
    private readonly favorites: Favorites = {
        artists: [],
        albums: [],
        tracks: [],
    };

    constructor(
        private readonly artistsService: ArtistsService,
        private readonly albumsService: AlbumsService,
        private readonly tracksService: TracksService,
    ) {}

    get() {
        const { artists, albums, tracks } = this.favorites;
        const mapAll = (
            source: string[],
            service: ArtistsService | AlbumsService | TracksService,
        ) => source.map((id) => service.findOne(id));
        return {
            artists: mapAll(artists, this.artistsService),
            albums: mapAll(albums, this.albumsService),
            tracks: mapAll(tracks, this.tracksService),
        } as FavoritesResponseDto;
    }

    addArtist(id: string) {
        if (!this.favorites.artists.includes(id))
            this.favorites.artists.push(id);
    }

    addTrack(id: string) {
        if (!this.favorites.tracks.includes(id)) this.favorites.tracks.push(id);
    }

    addAlbum(id: string) {
        if (!this.favorites.albums.includes(id)) this.favorites.albums.push(id);
    }

    removeArtist(id: string) {
        FavoritesRepository.removeEntity(
            id,
            this.favorites.artists,
            true,
            `Artist with id = ${id} not found in favorites`,
        );
    }

    removeTrack(id: string) {
        FavoritesRepository.removeEntity(
            id,
            this.favorites.tracks,
            true,
            `Track with id = ${id} not found in favorites`,
        );
    }

    removeAlbum(id: string) {
        FavoritesRepository.removeEntity(
            id,
            this.favorites.albums,
            true,
            `Album with id = ${id} not found in favorites`,
        );
    }

    @OnEvent(ALBUM_REMOVED)
    handleAlbumRemovedEvent(payload: AlbumRemovedPayload) {
        FavoritesRepository.removeEntity(
            payload.albumId,
            this.favorites.albums,
            false,
        );
    }

    @OnEvent(TRACK_REMOVED)
    handleTrackRemovedEvent(payload: TrackRemovedPayload) {
        FavoritesRepository.removeEntity(
            payload.trackId,
            this.favorites.tracks,
            false,
        );
    }

    @OnEvent(ARTIST_REMOVED)
    handleArtistRemovedEvent(payload: ArtistRemovedPayload) {
        FavoritesRepository.removeEntity(
            payload.artistId,
            this.favorites.artists,
            false,
        );
    }

    private static removeEntity(
        entityId: string,
        source: string[],
        throwErrorWhenNotFound: boolean,
        errorMessage?: string,
    ) {
        const index = source.findIndex((id: string) => id === entityId);
        if (index !== -1) source.splice(index, 1);
        else if (throwErrorWhenNotFound)
            throw new EntityNotFoundError(
                errorMessage ?? `Entity with id = ${entityId} not found`,
            );
    }
}
