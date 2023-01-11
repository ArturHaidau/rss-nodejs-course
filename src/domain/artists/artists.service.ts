import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsRepository } from './artists.repository';

@Injectable()
export class ArtistsService {
    constructor(private readonly artistsRepository: ArtistsRepository) {}

    create(createArtistDto: CreateArtistDto) {
        return this.artistsRepository.create(createArtistDto);
    }

    findAll() {
        return this.artistsRepository.findAll();
    }

    findOne(id: string) {
        return this.artistsRepository.findOne(id);
    }

    update(id: string, updateArtistDto: UpdateArtistDto) {
        return this.artistsRepository.update(id, updateArtistDto);
    }

    remove(id: string) {
        this.artistsRepository.remove(id);
    }
}
