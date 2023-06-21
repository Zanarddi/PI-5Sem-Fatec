export interface ParkingSpot {
  // TODO: define the parking spot interface
}

export class ParkingSpotModel {
  private id!: string;
  private state!: number;
  private name!: string;
  private type!: string;
  private posX!: number;
  private posY!: number;

  constructor(id?: string, state?: number, name?: string, type?: string, posX?: number, posY?: number) {
    if (id != undefined) {
      this.id = id;
    }
    if (state != undefined) {
      this.state = state;
    }
    if (name != undefined) {
      this.name = name;
    }
    if (type != undefined) {
      this.type = type;
    }
    if (posX != undefined) {
      this.posX = posX;
    }
    if (posY != undefined) {
      this.posY = posY;
    }
  }

  public setId(id: string) {
    this.id = id;
  }

  public setState(state: number) {
    this.state = state;
  }
}