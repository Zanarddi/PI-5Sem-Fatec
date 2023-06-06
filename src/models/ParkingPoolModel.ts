import { ParkingModel } from './ParkingModel';

export class ParkingPool {
  private static instance: ParkingPool;

  private parkingPool: { [id: string]: ParkingModel };

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

  public async getParking(id: string): Promise<ParkingModel> {
    // test if parking exists in the pool
    if (!this.parkingPool.hasOwnProperty(id)) {
      // if false, test if the parking exists in the database
      var tmpPaking = new ParkingModel();
      
      tmpPaking.setId(id);
      if (!(await tmpPaking.getParking())) {
        // log that the parking does not exists
      } else {
        // if true, add the parking to the pool
        this.addParking(tmpPaking);
      }
    }
    // return the parking, if it was not found, it will return undefined
    return this.parkingPool[id];
  }
}