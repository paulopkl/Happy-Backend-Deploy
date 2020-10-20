"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrphanages1602629775041 = void 0;
const typeorm_1 = require("typeorm");
class createOrphanages1602629775041 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'orphanages',
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
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'latitude',
                    type: 'varchar',
                },
                {
                    name: 'longitude',
                    type: 'varchar',
                },
                {
                    name: 'about',
                    type: 'text'
                },
                {
                    name: 'instructions',
                    type: 'text'
                },
                // {
                //     name: 'whatssap',
                //     type: 'integer',
                // },
                {
                    name: 'opening_hours',
                    type: "varchar"
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false
                }
            ]
        }));
    }
    async down(queryRunner) {
        return await queryRunner.dropTable('orphanages');
    }
}
exports.createOrphanages1602629775041 = createOrphanages1602629775041;
