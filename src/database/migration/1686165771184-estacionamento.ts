import { MigrationInterface, QueryRunner } from "typeorm"

export class Estacionamento1686165771184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE estacionamento (
            cod_estacionamento INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50),
            cep VARCHAR(10),
            numero INT,
            cod_convite INT);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE estacionamento;`);
    }

}
