import { Request, Response } from 'express';
import { ParkingPool } from '../models/ParkingPoolModel';

export class ParkingPoolController {

    constructor() {
    }

    public async getParking(req: Request, res: Response) {

        await req.body.user.getParkings();
        var parkings = [];
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
        // checking if the request has the parking_id
        var parkingId: string;
        if (!req.body.hasOwnProperty('parking_id')) {
            console.log('Bad request');
            return res.status(400).send("Bad request");
        }
        parkingId = req.body.parking_id;
        // checking if the user has access to the parking
        if ((await req.body.user.getParkings()).includes(parseInt(parkingId))) {
            // getting the parking spots
            await (await ParkingPool.getInstance().getParking(parkingId)).getParkingSpots();
            // returning the parking, now with the parking spots
            return res.status(200).send(await ParkingPool.getInstance().getParking(parkingId));
        } else {
            return res.status(404).send("Unauthorized");
        }
    }

}