import { MigrationInterface, QueryRunner } from "typeorm"

export class IndexParticipacao1687360211579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE participacao
            ADD CONSTRAINT ind_participacao UNIQUE (cod_usuario, cod_estacionamento, tipo_participacao);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE participacao
            DROP INDEX ind_participacao;
        `);
    }

}
