import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from '../../common/errors/entity-not-found.error';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(Artist)
        private readonly artistsRepository: Repository<Artist>,
    ) {}

    async create(createArtistDto: CreateArtistDto) {
        return await this.artistsRepository.save(
            this.artistsRepository.create(createArtistDto),
        );
    }

    async findAll() {
        return await this.artistsRepository.find();
    }

    async findOne(id: string) {
        return await this.findById(id);
    }

    async update(id: string, updateArtistDto: UpdateArtistDto) {
        return await this.artistsRepository.save({
            ...(await this.findById(id)),
            ...updateArtistDto,
        });
    }

    async remove(id: string) {
        const artist = await this.findById(id);
        await this.artistsRepository.remove(artist);
    }

    private async findById(id: string) {
        const artist = await this.artistsRepository.findOneBy({ id });
        if (artist) return artist;
        else throw new EntityNotFoundError(`Artist with id = ${id} not found`);
    }
}
