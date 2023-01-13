import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';
import * as Utils from './utils';

const TABLE_NAME = 'albums';

export class CreateAlbumsTable1663934572702 implements MigrationInterface {
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
                        name: 'year',
                        type: 'int',
                    },
                    {
                        name: 'artist_id',
                        type: 'uuid',
                        isNullable: true,
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
    }

    async down(queryRunner: QueryRunner) {
        await Utils.removeForeignKeys(TABLE_NAME, ['artist_id'], queryRunner);
        await queryRunner.dropColumn(TABLE_NAME, 'artist_id');
        await queryRunner.dropTable(TABLE_NAME);
    }
}
