import { appDataSource } from '../database/DataSource';
import { QueryRunner } from "typeorm";
import { userLogger } from '../utils/Logger';
const admin = require("firebase-admin");

export class UserModel {
    private id !: string;
    private email!: string;
    private name!: string;
    private parkings: Array<string> = [];

    constructor(email: string) {
        this.email = email;
    }

    public async setName(name: string) {
        this.name = name;
    }

    public async addToParking(parkingId: string) {

        let queryRunner: QueryRunner = await appDataSource.createQueryRunner();
        await queryRunner.connect();
        let result = await queryRunner.query(
            `INSERT INTO participacao (cod_usuario, cod_estacionamento, tipo_participacao)
            VALUES (${this.id}, ${parkingId}, "usuario");`
        ).catch((err) => {
            userLogger.error(`user ${this.email} tried to add ${parkingId} unsuccessfully, MySQL error: ${err.errno}`);
        });
        await queryRunner.release();
        if(result == undefined){
            return false;
        }
        if (result.length <= 0) {
            userLogger.error(`user ${this.email} not added to parking ${parkingId}`);
            return false;
        }
        userLogger.info(`user ${this.email} added to parking ${parkingId}`);
        return true;
    }

    public async getInfo() {
        let queryRunner: QueryRunner = await appDataSource.createQueryRunner();
        await queryRunner.connect();
        let result = await queryRunner.query(
            `SELECT u.* FROM usuario u
            WHERE u.email = "${this.email}";`
        ).catch((err) => {
            console.log(err);
        });
        await queryRunner.release();

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

    public async create() {
        let queryRunner: QueryRunner = await appDataSource.createQueryRunner();
        await queryRunner.connect();
        let result = await queryRunner.query(
            `INSERT INTO usuario (usuario, email)
            VALUES ("${this.name}", "${this.email}");`
        );
        await queryRunner.release();
        if (result.length <= 0) {
            userLogger.error(`user ${this.email} not created`);
            return false;
        }
        userLogger.info(`user ${this.email} created`);
        return true;
    }

    public async auth(token: string) {
        return await admin.auth().verifyIdToken(token)
            .then((decodedToken: any) => {
                if (decodedToken.email != this.email) {
                    userLogger.error(`user ${this.email} not authenticated`);
                    return false;
                }
                else {
                    this.name = decodedToken.name;
                    userLogger.info(`user ${this.email} authenticated`);
                    return true;
                }
            })
            .catch((error: any) => {
                userLogger.error(`user ${this.email} not authenticated`);
                return false;
            });
    }

    public async getParkings() {
        let queryRunner: QueryRunner = await appDataSource.createQueryRunner();
        await queryRunner.connect();
        let result = await queryRunner.query(
            `SELECT cod_estacionamento FROM participacao
            WHERE cod_usuario = "${this.id}";`
        );
        await queryRunner.release();
        if (result.length <= 0) {
            return [];
        }
        for (let i = 0; i < result.length; i++) {
            this.parkings.push(result[i].cod_estacionamento);
        }
        return this.parkings;
    }
}