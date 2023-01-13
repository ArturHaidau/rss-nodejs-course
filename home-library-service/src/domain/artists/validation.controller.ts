import { IsUUID } from 'class-validator';

class CommonParams {
    @IsUUID()
    id: string;
}

export class FindOneParams extends CommonParams {}

export class UpdateParams extends CommonParams {}

export class RemoveParams extends CommonParams {}
