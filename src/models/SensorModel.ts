import { appDataSource } from "../database/DataSource";
import { QueryRunner } from "typeorm";
import { sensorLogger } from "../utils/Logger";
export interface Sensor {
  id: string;
  state: number;
}

export class SensorModel {

  private id!: string;
  private state!: number;

  constructor() {
  }

  // updates the state of the sensor
  // must be called from the controller, and update the database
  public async updateDatabase() {
    let queryRunner: QueryRunner = await appDataSource.createQueryRunner();
    await queryRunner.connect();
    let result = await queryRunner.query(
      `CALL AlterarEstadoVaga("${this.id}", ${this.state});`
    );
    // let result = await queryRunner.query(
    //   `UPDATE vaga
    //   SET ocupado = ${this.state}
    //   WHERE cod_sensor = "${this.id}";`
    // );
    await queryRunner.release();
    if(result[0][0].hasOwnProperty('mantido')) {
      sensorLogger.info(`Sensor ${this.id} | mantido em ${this.state}`);
      return true;
    }
    else if(result[0][0].hasOwnProperty('atualizado')) {
      sensorLogger.info(`Sensor ${this.id} | atualizado para ${this.state}`);
      return true;
    }
    else if(result[0][0].hasOwnProperty('nao encontrado')){
      sensorLogger.warning(`Sensor ${this.id} | não encontrado`);
      return false;
    }
  }

  public setId(id: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public getState(): number {
    return this.state;
  }

  public setState(state: number) {
    this.state = state;
  }
}