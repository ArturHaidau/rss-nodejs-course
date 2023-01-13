import { Module } from '@nestjs/common';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
    controllers: [TracksController],
    providers: [TracksService],
    exports: [TracksService],
    imports: [ArtistsModule, AlbumsModule, TypeOrmModule.forFeature([Track])],
})
export class TracksModule {}
