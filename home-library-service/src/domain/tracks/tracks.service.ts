import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from '../../common/errors/entity-not-found.error';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
    constructor(
        @InjectRepository(Track)
        private readonly tracksRepository: Repository<Track>,
        private readonly artistsService: ArtistsService,
        private readonly albumsService: AlbumsService,
    ) {}

    async create(createTrackDto: CreateTrackDto) {
        const { artistId, albumId, ...rest } = createTrackDto;
        return await this.tracksRepository.save(
            this.tracksRepository.create({
                ...rest,
                artist: await TracksService.getByIdFromService(
                    artistId,
                    this.artistsService,
                ),
                album: await TracksService.getByIdFromService(
                    albumId,
                    this.albumsService,
                ),
            }),
        );
    }

    async findAll() {
        return await this.tracksRepository.find({
            relations: { artist: true, album: true },
        });
    }

    async findOne(id: string) {
        return await this.findById(id);
    }

    async update(id: string, updateTrackDto: UpdateTrackDto) {
        const { albumId, artistId, ...rest } = updateTrackDto;
        return await this.tracksRepository.save({
            ...(await this.findById(id)),
            ...rest,
            ...(albumId !== undefined && {
                album: await TracksService.getByIdFromService(
                    albumId,
                    this.albumsService,
                ),
            }),
            ...(artistId !== undefined && {
                artist: await TracksService.getByIdFromService(
                    artistId,
                    this.artistsService,
                ),
            }),
        });
    }

    async remove(id: string) {
        const track = await this.findById(id);
        await this.tracksRepository.remove(track);
    }

    private async findById(id: string) {
        const track = await this.tracksRepository.findOne({
            where: { id },
            relations: { artist: true, album: { artist: true } },
        });
        if (track) return track;
        else throw new EntityNotFoundError(`Track with id = ${id} not found`);
    }

    private static async getByIdFromService(
        id: string | null,
        service: AlbumsService | ArtistsService,
    ) {
        return id ? await service.findOne(id) : null;
    }
}
