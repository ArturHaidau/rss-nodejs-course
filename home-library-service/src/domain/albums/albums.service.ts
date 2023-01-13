import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from '../../errors/entity-not-found.error';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(Album)
        private readonly albumsRepository: Repository<Album>,
        private readonly artistsService: ArtistsService,
    ) {}

    async create(createAlbumDto: CreateAlbumDto) {
        const { artistId, ...rest } = createAlbumDto;
        return await this.albumsRepository.save(
            this.albumsRepository.create({
                ...rest,
                artist: artistId
                    ? await this.artistsService.findOne(artistId)
                    : null,
            }),
        );
    }

    async findAll() {
        return await this.albumsRepository.find({
            relations: { artist: true },
        });
    }

    async findOne(id: string) {
        return await this.findById(id);
    }

    async update(id: string, updateAlbumDto: UpdateAlbumDto) {
        const { artistId, ...rest } = updateAlbumDto;
        return await this.albumsRepository.save({
            ...(await this.findById(id)),
            ...rest,
            ...(artistId !== undefined && {
                artist: artistId
                    ? await this.artistsService.findOne(artistId)
                    : null,
            }),
        });
    }

    async remove(id: string) {
        const album = await this.findById(id);
        await this.albumsRepository.remove(album);
    }

    private async findById(id: string) {
        const album = await this.albumsRepository.findOne({
            where: { id },
            relations: { artist: true },
        });
        if (album) return album;
        else throw new EntityNotFoundError(`Album with id = ${id} not found`);
    }
}
