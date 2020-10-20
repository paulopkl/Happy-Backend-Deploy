import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1602644916240 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id', 
                    type: 'integer', 
                    unsigned: true, 
                    isPrimary: true, 
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'orphanage_id', // Here
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'ImageOrphanage', // Key Name
                    columnNames: ['orphanage_id'], // Column name
                    referencedTableName: 'orphanages', // References to table 'orphanages'
                    referencedColumnNames: ['id'], // References to column 'id'
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }
}