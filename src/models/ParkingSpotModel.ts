export interface ParkingSpot {
  // TODO: define the parking spot interface
}

export class ParkingSpotModel {
  private id!: string;
  private state!: number;

  constructor(id?: string, state?: number) {
    if (id != undefined) {
      this.id = id;
    }
    if (state != undefined) {
      this.state = state;
    }
  }

  public setId(id: string) {
    this.id = id;
  }

  public setState(state: number) {
    this.state = state;
  }
}