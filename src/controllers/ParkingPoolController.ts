import { Request, Response } from 'express';
import { ParkingPool } from '../models/ParkingPoolModel';

export class ParkingPoolController {

    constructor() {
    }

    public async getParking(req: Request, res: Response) {

        var parkingId: string;
        var requestBody = req.body;

        if (!requestBody.hasOwnProperty('parking_id')) {
            console.log('Bad request');
            return res.status(400).send("Bad request");
        }

        parkingId = req.body.parking_id;

        if (parkingId == undefined) {
            console.log('Bad request');
            return res.status(400).send("Bad request");
        }
        // TODO: log the found parking
        var parking = await ParkingPool.getInstance().getParking(parkingId)
        return res.status(200).send(JSON.stringify(parking));
    }
}