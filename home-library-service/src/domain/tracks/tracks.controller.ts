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
    UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
    FindOneParams,
    RemoveParams,
    UpdateParams,
} from './validation.controller';

@UseGuards(AccessTokenGuard)
@Controller('track')
export class TracksController {
    constructor(private readonly tracksService: TracksService) {}

    @Post()
    async create(@Body() createTrackDto: CreateTrackDto) {
        return await this.tracksService.create(createTrackDto);
    }

    @Get()
    async findAll() {
        return await this.tracksService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params: FindOneParams) {
        return await this.tracksService.findOne(params.id);
    }

    @Put(':id')
    async update(
        @Param() params: UpdateParams,
        @Body() updateTrackDto: UpdateTrackDto,
    ) {
        return await this.tracksService.update(params.id, updateTrackDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param() params: RemoveParams) {
        await this.tracksService.remove(params.id);
    }
}
