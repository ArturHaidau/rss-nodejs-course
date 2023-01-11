import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
    FindOneParams,
    RemoveParams,
    UpdateParams,
} from './validation.controller';

@Controller('track')
export class TracksController {
    constructor(private readonly tracksService: TracksService) {}

    @Post()
    create(@Body() createTrackDto: CreateTrackDto) {
        return this.tracksService.create(createTrackDto);
    }

    @Get()
    findAll() {
        return this.tracksService.findAll();
    }

    @Get(':id')
    findOne(@Param() params: FindOneParams) {
        return this.tracksService.findOne(params.id);
    }

    @Put(':id')
    update(
        @Param() params: UpdateParams,
        @Body() updateTrackDto: UpdateTrackDto,
    ) {
        return this.tracksService.update(params.id, updateTrackDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param() params: RemoveParams) {
        this.tracksService.remove(params.id);
    }
}
