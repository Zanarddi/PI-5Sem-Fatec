import { Request, Response } from 'express';
import { ParkingModel, Parking } from '../models/ParkingModel';

export class ParkingController {
  constructor() {
  }

  // method that get parking state, with the parking spots, and return a parking object
  public async getParking(req: Request, res: Response) {
    let parkingId: string;
    try {
      parkingId = req.params.id;
      if (parkingId == undefined) {
        throw new Error('Bad request');
      }
    }
    catch (err) {
      //send bad request
      return res.status(400).send("Bad request");
    }

    let parking: ParkingModel = new ParkingModel();
    parking.setId(parkingId);

    if (!(await parking.getParking())){
      return res.status(404).send("Parking not found");
    }
    if (!(await parking.getParkingSpots())){
      return res.status(404).send("Parking spots not found");
    }
    return res.status(200).send(JSON.stringify(parking));
  }
}