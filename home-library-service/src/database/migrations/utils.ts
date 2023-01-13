import { QueryRunner, TableColumnOptions } from 'typeorm';

export const removeForeignKeys = async (
    tableName: string,
    xs: string[],
    queryRunner: QueryRunner,
) => {
    const table = await queryRunner.getTable(tableName);
    if (table)
        for (const x of xs) {
            const foreignKey = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf(x) !== -1,
            );
            if (foreignKey)
                await queryRunner.dropForeignKey(tableName, foreignKey);
        }
};

export const getPrimaryKey = (): TableColumnOptions => ({
    name: 'id',
    type: 'uuid',
    isPrimary: true,
    isUnique: true,
    generationStrategy: 'uuid',
    default: 'uuid_generate_v4()',
});
