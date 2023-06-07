import { MigrationInterface, QueryRunner } from "typeorm"

export class Usuario1686166091386 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE usuario (
            cod_usuario INT AUTO_INCREMENT PRIMARY KEY,
            usuario VARCHAR (50),
            email VARCHAR (50));`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE usuario;`);
    }

}
