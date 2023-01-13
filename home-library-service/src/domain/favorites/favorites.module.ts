import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteAlbum } from './entities/favorite-album.entity';
import { FavoriteTrack } from './entities/favorite-track.entity';
import { FavoriteArtist } from './entities/favorite-artist.entity';
import { LoggingModule } from '../../logging/logging.module';

@Module({
    controllers: [FavoritesController],
    providers: [FavoritesService],
    imports: [
        LoggingModule,
        ArtistsModule,
        AlbumsModule,
        TracksModule,
        TypeOrmModule.forFeature([
            FavoriteAlbum,
            FavoriteTrack,
            FavoriteArtist,
        ]),
    ],
})
export class FavoritesModule {}
