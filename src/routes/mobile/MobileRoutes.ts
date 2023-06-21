const express = require('express');
const router = express.Router();
import { UserController } from '../../controllers/UserController';
import { ParkingPoolController } from '../../controllers/ParkingPoolController';

const userController = new UserController();
const parkingPoolController = new ParkingPoolController();

router.post('/parking/get', parkingPoolController.getParking);
router.post('/parking/getspots', parkingPoolController.getParkingSpots);
router.post('/parking/adduser', userController.addParking);

module.exports = router;