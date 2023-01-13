import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';

@Module({
    controllers: [ArtistsController],
    providers: [ArtistsService],
    exports: [ArtistsService],
    imports: [TypeOrmModule.forFeature([Artist])],
})
export class ArtistsModule {}
