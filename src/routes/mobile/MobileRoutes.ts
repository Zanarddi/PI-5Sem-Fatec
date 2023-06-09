const express = require('express');
const router = express.Router();

import { ParkingPoolController } from '../../controllers/ParkingPoolController';

const parkingPoolController = new ParkingPoolController();

router.get('/parking/get', parkingPoolController.getParking);
router.get('/parking/getspots', parkingPoolController.getParkingSpots);

module.exports = router;