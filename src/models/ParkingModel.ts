import { appDataSource } from '../database/DataSource';
import { QueryRunner } from "typeorm";
import { ParkingSpotModel } from './ParkingSpotModel';

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
    let result = await queryRunner.query(
      `SELECT e.* FROM estacionamento e
      WHERE e.cod_estacionamento = "${this.id}";`
    );
    if (result.length <= 0) {
      return false;
    }
    this.name = result[0].nome;
    this.cep = result[0].cep;
    this.numero = result[0].numero;
    this.codConvite = result[0].cod_convite;
    return true;
  }

  async getParkingSpots() {
    let queryRunner: QueryRunner = await appDataSource.createQueryRunner();
    let result = await queryRunner.query(
      `SELECT v.* FROM vaga v, estacionamento e
      WHERE v.cod_estacionamento = e.cod_estacionamento
      AND e.cod_estacionamento = "${this.id}";`
    );
    if (result.length <= 0) {
      return false;
    } 
    for (let i = 0; i < result.length; i++) {
      this.parkingSpots.push(new ParkingSpotModel(result[i].cod_vaga, result[i].ocupado));
    }
  }

}