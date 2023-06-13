import { Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/UserController';
import { userLogger } from '../utils/Logger';

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
    console.log(`Authenticating user ${req.body.email}`);
    
    let tmpUser = await userController.getUser(req.body.email);
    
    // Check if the user exists
    // TODO: change to auth, to check on Firebase
    if (await tmpUser.getInfo()) {
        console.log(`temp user: ${JSON.stringify(tmpUser)}`);
        req.body.user = tmpUser;
        return next();
    } else {
        // If the user is not authenticated, send a 401 Unauthorized response
        return res.status(404).send("Unauthorized");
    }
}