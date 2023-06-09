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

    let tmpUser = await userController.getUser(req.body.email);
    // Check if the user exists
    if (await tmpUser.getInfo()) {
        req.body.user = tmpUser;
        userLogger.info(`user ${req.body.email} authenticated`);
        return next();
    } else {
        // If the user is not authenticated, send a 401 Unauthorized response
        userLogger.error(`user ${req.body.email} not found`);
        return res.status(404).send("Unauthorized");
    }
}