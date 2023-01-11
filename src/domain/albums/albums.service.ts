import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepository } from './albums.repository';

@Injectable()
export class AlbumsService {
    constructor(private readonly albumsRepository: AlbumsRepository) {}

    create(createAlbumDto: CreateAlbumDto) {
        return this.albumsRepository.create(createAlbumDto);
    }

    findAll() {
        return this.albumsRepository.findAll();
    }

    findOne(id: string) {
        return this.albumsRepository.findOne(id);
    }

    update(id: string, updateAlbumDto: UpdateAlbumDto) {
        return this.albumsRepository.update(id, updateAlbumDto);
    }

    remove(id: string) {
        this.albumsRepository.remove(id);
    }
}
