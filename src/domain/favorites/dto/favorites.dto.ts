import { IsUUID } from 'class-validator';

export class FavoritesDto {
    @IsUUID()
    id: string;
}
