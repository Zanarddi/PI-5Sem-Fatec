import { appDataSource } from '../database/DataSource';
import { QueryRunner } from "typeorm";
import { userLogger } from '../utils/Logger';

export class UserModel {
    private id !: string;
    private email!: string;
    private name!: string;
    private parkings: Array<string> = [];

    constructor(email: string) {
        this.email = email;
    }

    public async getInfo() {
        let queryRunner: QueryRunner = appDataSource.createQueryRunner();
        let result = await queryRunner.query(
            `SELECT u.* FROM usuario u
            WHERE u.email = "${this.email}";`
        );
        if (result.length <= 0) {
            userLogger.error(`user ${this.email} not found`);
            return false;
        }
        this.id = result[0].cod_usuario;
        this.email = result[0].email;
        this.name = result[0].usuario;
        userLogger.info(`user ${this.email} authenticated`);
        return true;
    }

    public async auth() {
        // TODO implement firebase auth
        userLogger.info(`user ${this.email} authenticated`);
        return true;
    }

    public async getParkings() {
        let queryRunner: QueryRunner = await appDataSource.createQueryRunner();
        let result = await queryRunner.query(
            `SELECT cod_estacionamento FROM participacao
            WHERE cod_usuario = "${this.id}";`
        );

        if (result.length <= 0) {
            return [];
        }
        for (let i = 0; i < result.length; i++) {
            this.parkings.push(result[i].cod_estacionamento);
        }
        return this.parkings;
    }
}