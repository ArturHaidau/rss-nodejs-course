import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';
import * as Utils from './utils';

const TABLE_NAME = 'favorite_albums';

export class CreateFavoriteAlbumsTable1663934623783
    implements MigrationInterface
{
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { ...Utils.getPrimaryKey() },
                    {
                        name: 'album_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            TABLE_NAME,
            new TableForeignKey({
                columnNames: ['album_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'albums',
                onDelete: 'cascade',
            }),
        );
    }

    async down(queryRunner: QueryRunner) {
        await Utils.removeForeignKeys(TABLE_NAME, ['album_id'], queryRunner);
        await queryRunner.dropColumn(TABLE_NAME, 'album_id');
        await queryRunner.dropTable(TABLE_NAME);
    }
}
