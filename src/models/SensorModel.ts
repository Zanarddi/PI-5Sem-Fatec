
export class SensorModel {

  private id : number;
  private state : number;
  constructor(id : number, state : number) {
    this.id = id;
    this.state = state;
  }

  public getId() : number {
    return this.id;
  }

  public getState() : number {
    return this.state;
  }
}