import { MigrationInterface, QueryRunner } from "typeorm"

export class AdicionarPosXePosY1687312008150 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE vaga
            ADD COLUMN pos_x INT DEFAULT 0,
            ADD COLUMN pos_y INT DEFAULT 0;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE vaga
            DROP COLUMN pos_x,
            DROP COLUMN pos_y;
        `);
    }


}
