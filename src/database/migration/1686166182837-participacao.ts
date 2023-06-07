import { MigrationInterface, QueryRunner } from "typeorm"

export class Participacao1686166182837 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE participacao (
            cod_usuario_estacionamento INT AUTO_INCREMENT PRIMARY KEY,
            cod_usuario INT, 
            cod_estacionamento INT,
            tipo_participacao VARCHAR (10),
            
            FOREIGN KEY(cod_usuario) REFERENCES usuario(cod_usuario),
            FOREIGN KEY(cod_estacionamento) REFERENCES estacionamento(cod_estacionamento));`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE participacao;`);
    }

}
