import { ParkingModel } from './ParkingModel';

export class ParkingPool {
  private static instance: ParkingPool;

  public parkingPool: { [id: string]: ParkingModel };

  private constructor() {
    this.parkingPool = {};
  }

  public static getInstance(): ParkingPool {
    if (!ParkingPool.instance) {
      ParkingPool.instance = new ParkingPool();
    }
    return ParkingPool.instance;
  }

  private addParking(parking: ParkingModel) {
    this.parkingPool[parking.getId()] = parking;
  }

  public getParking(id: string): ParkingModel {
    return this.parkingPool[id];
  }
}