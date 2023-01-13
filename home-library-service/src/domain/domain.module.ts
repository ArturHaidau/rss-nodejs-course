import { Module } from '@nestjs/common';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
    imports: [
        UsersModule,
        TracksModule,
        ArtistsModule,
        AlbumsModule,
        FavoritesModule,
    ],
})
export class DomainModule {}
