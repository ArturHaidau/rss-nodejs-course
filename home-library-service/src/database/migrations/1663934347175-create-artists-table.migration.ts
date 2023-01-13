import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import * as Utils from './utils';

const TABLE_NAME = 'artists';

export class CreateArtistsTable1663934347175 implements MigrationInterface {
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { ...Utils.getPrimaryKey() },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'grammy',
                        type: 'boolean',
                    },
                ],
            }),
        );
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable(TABLE_NAME);
    }
}
