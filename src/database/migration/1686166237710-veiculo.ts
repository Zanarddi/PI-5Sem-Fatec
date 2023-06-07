import { MigrationInterface, QueryRunner } from "typeorm"

export class Veiculo1686166237710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE veiculo (
    cod_veiculo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR (10),
    modelo VARCHAR (20),
    cor VARCHAR (20), 
    dono INT,
    tipo VARCHAR (10), 
    
    FOREIGN KEY(dono) REFERENCES usuario(cod_usuario));`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE veiculo;`);
    }

}
