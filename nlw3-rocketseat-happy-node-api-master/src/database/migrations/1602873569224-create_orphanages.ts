import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602873569224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // realiza as alterações na tabela ou cria a tabela

        await queryRunner.createTable(new Table({
            name: 'orphanages',
            columns: [{
                name: 'id',
                type: 'integer',
                unsigned: true, // o número não pode ser negativo
                isPrimary: true, // se é a chave primaria
                isGenerated: true, // é gerada automaticamente
                generationStrategy: 'increment', // é incrementada automaticamente
            }, {
                name: 'name',
                type: 'varchar',
            }, {
                name: 'latitude',
                type: 'decimal',
                scale: 10, // números antes da vírgula
                precision: 2, // números depois da vírgula
            }, {
                name: 'longitude',
                type: 'decimal',
                scale: 10, // números antes da vírgula
                precision: 2, // números depois da vírgula
            }, {
                name: 'about',
                type: 'text',
            }, {
                name: 'instructions',
                type: 'text',
            }, {
                name: 'opening_hours',
                type: 'varchar',
            }, {
                name: 'open_on_weekends',
                type: 'boolean',
                default: false
            }]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // desfaz o que foi feito no método up
        await queryRunner.dropTable('orphanages');
    }

}
