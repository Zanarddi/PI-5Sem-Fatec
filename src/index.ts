import { config } from 'dotenv';
import { DataSource, QueryRunner } from "typeorm";
import express, { Application, NextFunction, Request, Response } from 'express';

import { appDataSource } from "./database/dataSource";

const app: Application = express();
const PORT = process.env.PORT || 3000;

const iotRoutes = require('./routes/iot/IoTRoutes');
const mobileRoutes = require('./routes/mobile/MobileRoutes');

config();   // set env variables from dotenv
app.use(express.json());

// assigning routes to the route files
app.use('/iot', iotRoutes);
app.use('/mobile', mobileRoutes);

// starting the database and the server
appDataSource.initialize().then(async (dataSource) => {
    await dataSource.runMigrations().then(async () => {
        console.log('Migrations run successfully');
        app.listen(PORT);
        console.log(`Server is listening on port ${PORT}`);
    }).catch((error) => {
        // catching errors from migrations
        console.error(error);
    });
}).catch((error) => {
    // catching errors from dataSource initialization
    console.error(error);
});

// const queryRunner: QueryRunner = await appDataSource.createQueryRunner();
// const result = await queryRunner.query(
//     `SELECT * from migrations;`
// );
// await console.log(result);