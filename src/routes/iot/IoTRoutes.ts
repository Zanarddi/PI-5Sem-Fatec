import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();

const sensorRoutes = require('./sensor/SensorRoutes');

// Definir routes
router.use('/sensor', sensorRoutes);
router.get('/', (req: Request, res: Response) => {
  // Notice that the response must be dealed with in the controller, not in the route, this is temporary
  res.status(200).send('You accessed the IoT route');
});
;

module.exports = router;