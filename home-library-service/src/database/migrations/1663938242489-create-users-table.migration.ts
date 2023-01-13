import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import * as Utils from './utils';

const TABLE_NAME = 'users';

export class CreateUsersTable1663938242489 implements MigrationInterface {
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { ...Utils.getPrimaryKey() },
                    {
                        name: 'login',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'version',
                        type: 'int',
                        default: 0,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'refresh_token',
                        type: 'varchar',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable(TABLE_NAME);
    }
}
