import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';
import * as Utils from './utils';

const TABLE_NAME = 'favorite_tracks';

export class CreateFavoriteTracksTable1663934627678
    implements MigrationInterface
{
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { ...Utils.getPrimaryKey() },
                    {
                        name: 'track_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            TABLE_NAME,
            new TableForeignKey({
                columnNames: ['track_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'tracks',
                onDelete: 'cascade',
            }),
        );
    }

    async down(queryRunner: QueryRunner) {
        await Utils.removeForeignKeys(TABLE_NAME, ['track_id'], queryRunner);
        await queryRunner.dropColumn(TABLE_NAME, 'track_id');
        await queryRunner.dropTable(TABLE_NAME);
    }
}
