import { MigrationInterface, QueryRunner } from "typeorm"

export class Ocupacao1686166415659 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE ocupacao(
    cod_ocupacao INT AUTO_INCREMENT PRIMARY KEY, 
    cod_vaga INT, 
    cod_veiculo INT,
    data_inicio DATE,
    data_final DATE, 
    
    FOREIGN KEY(cod_vaga) REFERENCES vaga(cod_vaga),
    FOREIGN KEY(cod_veiculo) REFERENCES veiculo(cod_veiculo));`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE ocupacao;`);
    }


}
