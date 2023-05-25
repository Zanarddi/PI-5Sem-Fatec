import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();

// Definig routes
router.post('/', (req: Request, res: Response) => {
  // Notice that the response must be dealed with in the controller, not in the route, this is temporary
  console.log(req.body);
  console.log(req.body.device_id);
  
  
  res.send('You accessed the sensor route, again');
});

module.exports = router;