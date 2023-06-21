import { UserModel } from '../models/UserModel';

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
}