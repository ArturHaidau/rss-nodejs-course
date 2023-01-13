import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksRepository } from './tracks.repository';

@Injectable()
export class TracksService {
    constructor(private readonly tracksRepository: TracksRepository) {}

    create(createTrackDto: CreateTrackDto) {
        return this.tracksRepository.create(createTrackDto);
    }

    findAll() {
        return this.tracksRepository.findAll();
    }

    findOne(id: string) {
        return this.tracksRepository.findOne(id);
    }

    update(id: string, updateTrackDto: UpdateTrackDto) {
        return this.tracksRepository.update(id, updateTrackDto);
    }

    remove(id: string) {
        this.tracksRepository.remove(id);
    }
}
