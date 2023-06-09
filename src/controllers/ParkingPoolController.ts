import { Request, Response } from 'express';
import { ParkingPool } from '../models/ParkingPoolModel';

export class ParkingPoolController {

    constructor() {
    }

    public async getParking(req: Request, res: Response) {

        await req.body.user.getParkings();

        // array of parkings
        var parkings = [];

        // TODO: log the found parking
        for (var i = 0; i < req.body.user.parkings.length; i++) {
            var parking = await ParkingPool.getInstance().getParking(req.body.user.parkings[i]);
            parkings.push(parking);
            console.log(`PARKING, DEBUG ONLY -> ` + JSON.stringify(parking));
        }
        // logging the parking pool for debug
        console.log(`PARKING POOL, DEBUG ONLY -> ` + JSON.stringify(ParkingPool.getInstance()));

        return res.status(200).send(parkings);
    }

    public async getParkingSpots(req: Request, res: Response) {

        var parkingId: string;

        if (!req.body.hasOwnProperty('parking_id')) {
            console.log('Bad request');
            return res.status(400).send("Bad request");
        }

        parkingId = req.body.parking_id;

        if ((await req.body.user.getParkings()).includes(parseInt(parkingId))) {
            await (await ParkingPool.getInstance().getParking(parkingId)).getParkingSpots();
            return res.status(200).send(await ParkingPool.getInstance().getParking(parkingId));
        } else {
            return res.status(404).send("Unauthorized");
        }
    }

}