import { Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/UserController';
import { userLogger } from '../utils/Logger';
const admin = require("firebase-admin");

const userController = new UserController();

// Authentication middleware function
export async function authenticate(req: Request, res: Response, next: NextFunction) {

    // Check if the request requires authentication
    if (req.path.startsWith('/iot')) {
        return next();
    }
    // Check if the request has the email field
    if (!req.body.hasOwnProperty('email')) {
        console.log('Bad request');
        return res.status(400).send("Bad request");
    }
    if(!req.body.hasOwnProperty('token')) {
        console.log('Bad request');
        return res.status(400).send("Bad request");
    }
    console.log(`Authenticating user ${req.body.email}`);

    let tmpUser = await userController.getUser(req.body.email);

    if(await tmpUser.auth(req.body.token)) {
        if(await tmpUser.getInfo()){
            req.body.user = tmpUser;
            return next();
        }
        else{
            if(await tmpUser.create()){
                console.log(`temp user: ${JSON.stringify(tmpUser)}`);
                req.body.user = tmpUser;
                return next();
            } else {
                console.log(`Error creating user ${req.body.email}`);
                return res.status(500).send("Error creating user");
            }
        }
    }
}