import { MigrationInterface, QueryRunner } from "typeorm"

export class Vaga1686166312803 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE vaga (
            cod_vaga INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50),
            cod_estacionamento INT,
            ocupado INT, 
            tipo VARCHAR(20),
            cod_sensor VARCHAR(20),
            
            FOREIGN KEY(cod_estacionamento) REFERENCES estacionamento(cod_estacionamento));`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE vaga;`);
    }


}
