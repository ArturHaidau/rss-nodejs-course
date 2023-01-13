import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';
import * as Utils from './utils';

const TABLE_NAME = 'tracks';

export class CreateTracksTable1663934619503 implements MigrationInterface {
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
                        name: 'artist_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'album_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'duration',
                        type: 'int',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            TABLE_NAME,
            new TableForeignKey({
                columnNames: ['artist_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'artists',
                onDelete: 'set null',
            }),
        );

        await queryRunner.createForeignKey(
            TABLE_NAME,
            new TableForeignKey({
                columnNames: ['album_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'albums',
                onDelete: 'set null',
            }),
        );
    }

    async down(queryRunner: QueryRunner) {
        await Utils.removeForeignKeys(
            TABLE_NAME,
            ['artist_id', 'album_id'],
            queryRunner,
        );
        await queryRunner.dropColumn(TABLE_NAME, 'artist_id');
        await queryRunner.dropColumn(TABLE_NAME, 'album_id');
        await queryRunner.dropTable(TABLE_NAME);
    }
}
