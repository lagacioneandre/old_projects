import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1603132179453 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [{
                name: 'id',
                type: 'integer',
                unsigned: true, // o número não pode ser negativo
                isPrimary: true, // se é a chave primaria
                isGenerated: true, // é gerada automaticamente
                generationStrategy: 'increment', // é incrementada automaticamente
            }, {
                name: 'path',
                type: 'varchar',
            }, {
                name: 'orphanage_id',
                type: 'integer',
            }],
            foreignKeys: [{
                name: 'ImageOrphanage', // nome da chave estrangeira
                columnNames: ['orphanage_id'], // nome da coluna na tabela atual que vai armazenar essa chave
                referencedTableName: 'orphanages', // nome da tabela de origem dessa chave
                referencedColumnNames: ['id'], // nome das colunas de origem dessa chave
                onUpdate: 'CASCADE', // quando o ID de referencia for alterado, altera nos itens que contém essa chave estrangeira
                onDelete: 'CASCADE', // quando o ID de referência é deletado, deleta os itens que contém essa chave estrangeira
            }]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
