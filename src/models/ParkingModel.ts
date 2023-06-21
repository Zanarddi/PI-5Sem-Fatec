import { appDataSource } from '../database/DataSource';
import { QueryRunner } from "typeorm";
import { ParkingSpotModel } from './ParkingSpotModel';
import { parkingLogger } from '../utils/Logger';

export interface Parking {
  // TODO: define the parking interface
}

export class ParkingModel {
  private id!: string;
  private parkingSpots: Array<ParkingSpotModel> = [];
  private name!: string;
  private cep!: string;
  private numero!: string;
  private codConvite!: Date;
  private lastTimeConsulted!: Date;
  private lastTimeConsultedSpots!: Date;

  constructor() {
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  async getParking() {
    // TODO get data from database parking only, and set it to the object

    let queryRunner: QueryRunner = await appDataSource.createQueryRunner();
    await queryRunner.connect();
    let result = await queryRunner.query(
      `SELECT e.* FROM estacionamento e
      WHERE e.cod_estacionamento = "${this.id}";`
    );
    await queryRunner.release();
    if (result.length <= 0) {
      parkingLogger.error(`Parking ${this.id} not found`);
      return false;
    }
    this.name = result[0].nome;
    this.cep = result[0].cep;
    this.numero = result[0].numero;
    this.codConvite = result[0].cod_convite;
    this.lastTimeConsulted = new Date();
    parkingLogger.info(`Parking ${this.id} found`);
    return true;
  }

  async getParkingSpots() {
    if (this.lastTimeConsultedSpots == undefined || this.lastTimeConsultedSpots.getSeconds() < new Date().getSeconds() - 15) {
      let queryRunner: QueryRunner = await appDataSource.createQueryRunner();
      await queryRunner.connect();
      let result = await queryRunner.query(
        `SELECT v.* FROM vaga v, estacionamento e
        WHERE v.cod_estacionamento = e.cod_estacionamento
        AND e.cod_estacionamento = "${this.id}";`
      );
      await queryRunner.release();
      if (result.length <= 0) {
        parkingLogger.error(`Parking ${this.id} has no parking spots`);
        return false;
      }
      let tmpSpots: Array<ParkingSpotModel> = [];
      for (let i = 0; i < result.length; i++) {
        tmpSpots.push(new ParkingSpotModel(result[i].cod_vaga, result[i].ocupado, result[i].nome, result[i].tipo, result[i].pos_x, result[i].pos_y));
      }
      parkingLogger.info(`Parking ${this.id} has ${tmpSpots.length} parking spots`);
      this.lastTimeConsultedSpots = new Date();
      //log that spots were updated
      parkingLogger.info(`Parking ${this.id} spots were updated`);
      this.parkingSpots = tmpSpots;
    }
  }


  public getLastTimeConsulted(): Date {
    return this.lastTimeConsulted;
  }
}