import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
    controllers: [FavoritesController],
    providers: [FavoritesService, FavoritesRepository],
    imports: [ArtistsModule, AlbumsModule, TracksModule],
})
export class FavoritesModule {}
