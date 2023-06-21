import { UserModel } from '../models/UserModel';
import { Request, Response } from 'express';

export class UserController {
    constructor() {
    }

    public async getUser(email : string) : Promise<UserModel>{
        let tmpUser = new UserModel(email);
        return tmpUser;
    }

    public async checkUserParking(user : UserModel, parkingId : string) : Promise<boolean> {
        if ((await user.getParkings()).includes(parkingId)) {
            return true;
        }
        return false;
    }

    public async addParking(req: Request, res: Response) {
        if(await req.body.user.addToParking(req.body.parking_id)){
            return res.status(200).send('added');
        } else {
            return res.status(400).send('error');
        }
    }
}