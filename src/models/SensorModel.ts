import { appDataSource } from "../database/DataSource";
import { DataSource, QueryRunner } from "typeorm";
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
    let result = await queryRunner.query(
      `UPDATE vaga
      SET ocupado = ${this.state}
      WHERE cod_sensor = "${this.id}";`
    );
    
    if(result.affectedRows == 1) {
      sensorLogger.info(`Sensor ${this.id} | atualizado para ${this.state}`);
      return true;
    }
    else if (result.affectedRows == 0){
      sensorLogger.warning(`Sensor ${this.id} | não encontrado`);
      return false;
    }
    else {
      sensorLogger.error(`Erro ao atualizar sensor ${this.id}`);
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