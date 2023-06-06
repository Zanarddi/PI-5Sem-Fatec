const express = require('express');
const router = express.Router();

import { Request, Response } from 'express';
import { ParkingPoolController } from '../../controllers/ParkingPoolController';

const parkingPoolController = new ParkingPoolController();

router.get('/parking/get', parkingPoolController.getParking);

router.get('/parking', (req: Request, res: Response) => {
  // Notice that the response must be dealed with in the controller, not in the route, this is temporary
  res.status(200).send('You accessed the Mobile parking route');
});
// Definir routes
router.get('/', (req: Request, res: Response) => {
  // Notice that the response must be dealed with in the controller, not in the route, this is temporary
  res.status(200).send('You accessed the Mobile route');
});

module.exports = router;