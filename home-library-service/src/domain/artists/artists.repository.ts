import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { EntityNotFoundError } from '../../errors/entity-not-found.error';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ARTIST_REMOVED } from '../../event-types';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ArtistRemovedPayload } from './event-payloads/artist-removed.payload';

@Injectable()
export class ArtistsRepository {
    private readonly artists: Artist[] = [];

    constructor(private eventEmitter: EventEmitter2) {}

    create(createArtistDto: CreateArtistDto) {
        const newArtist = {
            id: crypto.randomUUID(),
            ...createArtistDto,
        };
        this.artists.push(newArtist);
        return newArtist;
    }

    findOne(id: string) {
        return this.findArtist(id).artist;
    }

    findAll() {
        return this.artists;
    }

    remove(id: string) {
        const { index } = this.findArtist(id);
        this.artists.splice(index, 1);
        this.eventEmitter.emit(ARTIST_REMOVED, {
            artistId: id,
        } as ArtistRemovedPayload);
    }

    update(id: string, updateArtistDto: UpdateArtistDto) {
        const { index } = this.findArtist(id);
        this.artists[index] = {
            ...this.artists[index],
            ...updateArtistDto,
        };
        return this.artists[index];
    }

    private findArtist(id: string) {
        const index = this.artists.findIndex((x) => x.id === id);
        if (index === -1)
            throw new EntityNotFoundError(`Artist with id = ${id} not found`);
        else return { index, artist: this.artists[index] };
    }
}
