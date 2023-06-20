const express = require('express');
const router = express.Router();

import { ParkingPoolController } from '../../controllers/ParkingPoolController';

const parkingPoolController = new ParkingPoolController();

router.post('/parking/get', parkingPoolController.getParking);
router.post('/parking/getspots', parkingPoolController.getParkingSpots);

module.exports = router;