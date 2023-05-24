import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();

// Definig routes
router.get('/', (req: Request, res: Response) => {
  // Notice that the response must be dealed with in the controller, not in the route, this is temporary
  res.send('You accessed the sensor route');
});

module.exports = router;