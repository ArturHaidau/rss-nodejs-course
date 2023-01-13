import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsRepository } from './artists.repository';

@Module({
    controllers: [ArtistsController],
    providers: [ArtistsService, ArtistsRepository],
    exports: [ArtistsService],
})
export class ArtistsModule {}
