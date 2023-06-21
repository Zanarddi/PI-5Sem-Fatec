import { ParkingModel } from './ParkingModel';
import { parkingLogger } from '../utils/Logger';
const TIME_TO_UPDATE = 5000;

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
      if (await tmpPaking.getParking()) {
        this.addParking(tmpPaking);
      }
    } 
    else {
      //TODO test if the parking was updated recently and update it if not, then return it, in the last 5 seconds
      if ((this.parkingPool[id].getLastTimeConsulted().valueOf() - new Date().valueOf()) < TIME_TO_UPDATE) {
        parkingLogger.info(`Parking ${id} retrieved from the database`);
        await this.parkingPool[id].getParking();
        this.parkingPool[id].setLastTimeConsulted(new Date());

      }
      else{
        parkingLogger.info(`Parking ${id} retrieved from the pool`);
        console.log(this.parkingPool[id].getLastTimeConsulted().valueOf() - new Date().valueOf());
        
        
      }
    }
    return this.parkingPool[id];
  }
}