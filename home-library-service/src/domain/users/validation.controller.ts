import { IsUUID } from 'class-validator';

class CommonParams {
    @IsUUID()
    id: string;
}

export class FindOneParams extends CommonParams {}

export class UpdatePasswordParams extends CommonParams {}

export class RemoveByIdParams extends CommonParams {}
