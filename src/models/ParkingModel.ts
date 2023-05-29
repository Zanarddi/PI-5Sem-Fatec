import { appDataSource } from '../database/DataSource';
import { ParkingSpot } from './ParkingSpotModel';

export interface Parking {
  // TODO: define the parking interface
}

export class ParkingModel {
  private id!: string;
  private parkingSpots!: ParkingSpot[];
  private lastTimeConsulted!: Date;

  constructor() {
  }

  public setId(id: string) {
    this.id = id;
  }

  async getParking(){
    // TODO: get data from database parking
    return true;
  }
  
  async getParkingSpots(){
    // TODO: get data from database parking spots, according to parking id
    // update this.parkingSpots
    // !!!! verify the last time the parking was consulted !!!!
    return true;
  }

}