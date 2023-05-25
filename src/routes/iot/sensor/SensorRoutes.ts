const express = require('express');
const router = express.Router();

import { SensorController } from '../../../controllers/SensorController';

const sensorController = new SensorController();

// Definig routes
router.post('/', sensorController.updateSensorState);

module.exports = router;