import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EntityNotFoundError } from '../../errors/entity-not-found.error';
import { AlbumRemovedPayload } from './event-payloads/album-removed.payload';
import { ALBUM_REMOVED, ARTIST_REMOVED } from '../../event-types';
import { ArtistRemovedPayload } from '../artists/event-payloads/artist-removed.payload';

@Injectable()
export class AlbumsRepository {
    private readonly albums: Album[] = [];

    constructor(private eventEmitter: EventEmitter2) {}

    create(createAlbumDto: CreateAlbumDto) {
        const newAlbum = {
            id: crypto.randomUUID(),
            ...createAlbumDto,
        };
        this.albums.push(newAlbum);
        return newAlbum;
    }

    findOne(id: string) {
        return this.findAlbum(id).album;
    }

    findAll() {
        return this.albums;
    }

    remove(id: string) {
        const { index } = this.findAlbum(id);
        this.albums.splice(index, 1);
        this.eventEmitter.emit(ALBUM_REMOVED, {
            albumId: id,
        } as AlbumRemovedPayload);
    }

    update(id: string, updateAlbumDto: UpdateAlbumDto) {
        const { index } = this.findAlbum(id);
        this.albums[index] = {
            ...this.albums[index],
            ...updateAlbumDto,
        };
        return this.albums[index];
    }

    @OnEvent(ARTIST_REMOVED)
    handleArtistRemovedEvent({ artistId }: ArtistRemovedPayload) {
        const index = this.albums.findIndex((x) => x.artistId === artistId);
        if (index !== -1)
            this.albums[index] = { ...this.albums[index], artistId: null };
    }

    private findAlbum(id: string) {
        const index = this.albums.findIndex((x) => x.id === id);
        if (index === -1)
            throw new EntityNotFoundError(`Album with id = ${id} not found`);
        else return { index, album: this.albums[index] };
    }
}
