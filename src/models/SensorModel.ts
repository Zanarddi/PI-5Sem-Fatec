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
  public async updateDatabase(): Promise<boolean> {
    // TODO: update the database
    // Deve verificar a presença de ambos os atributos antes de atualizar
    // Deve retornar true se atualizou com sucesso, false se não atualizou
    return true;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getId() : string {
    return this.id;
  }

  public getState(): number {
    return this.state;
  }

  public setState(state: number) {
    this.state = state;
  }
}