import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { EntityNotFoundError } from '../../errors/entity-not-found.error';
import { Track, TrackRefs } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
    ALBUM_REMOVED,
    ARTIST_REMOVED,
    TRACK_REMOVED,
} from '../../event-types';
import { ArtistRemovedPayload } from '../artists/event-payloads/artist-removed.payload';
import { AlbumRemovedPayload } from '../albums/event-payloads/album-removed.payload';
import { TrackRemovedPayload } from './event-payloads/track-removed.payload';

@Injectable()
export class TracksRepository {
    private readonly tracks: Track[] = [];

    constructor(private eventEmitter: EventEmitter2) {}

    create(createTrackDto: CreateTrackDto) {
        const newTrack = {
            id: crypto.randomUUID(),
            ...createTrackDto,
        };
        this.tracks.push(newTrack);
        return newTrack;
    }

    findOne(id: string) {
        return this.findTrack(id).track;
    }

    findAll() {
        return this.tracks;
    }

    remove(id: string) {
        const { index } = this.findTrack(id);
        this.tracks.splice(index, 1);
        this.eventEmitter.emit(TRACK_REMOVED, {
            trackId: id,
        } as TrackRemovedPayload);
    }

    update(id: string, updateTrackDto: UpdateTrackDto) {
        const { index } = this.findTrack(id);
        this.tracks[index] = {
            ...this.tracks[index],
            ...updateTrackDto,
        };
        return this.tracks[index];
    }

    @OnEvent(ARTIST_REMOVED)
    handleArtistRemovedEvent({ artistId }: ArtistRemovedPayload) {
        this.refreshId('artistId', artistId);
    }

    @OnEvent(ALBUM_REMOVED)
    handleAlbumRemovedEvent({ albumId }: AlbumRemovedPayload) {
        this.refreshId('albumId', albumId);
    }

    private refreshId(field: TrackRefs, id: string) {
        const index = this.tracks.findIndex((x) => x[field] === id);
        if (index !== -1)
            this.tracks[index] = { ...this.tracks[index], [field]: null };
    }

    private findTrack(id: string) {
        const index = this.tracks.findIndex((x) => x.id === id);
        if (index === -1)
            throw new EntityNotFoundError(`Track with id = ${id} not found`);
        else return { index, track: this.tracks[index] };
    }
}
