import { config } from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();
const PORT = process.env.PORT || 3000;

const iotRoutes = require('./routes/iot/IoTRoutes');
const mobileRoutes = require('./routes/mobile/MobileRoutes');

config();   // set env variables from dotenv
app.use(express.json());

// assigning routes to the route files
app.use('/iot', iotRoutes);
app.use('/mobile', mobileRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});