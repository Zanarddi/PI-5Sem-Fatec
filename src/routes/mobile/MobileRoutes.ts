import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();

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