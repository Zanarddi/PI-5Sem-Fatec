import { config } from 'dotenv';
import { DataSource, QueryRunner } from "typeorm";
import express, { Application, NextFunction, Request, Response } from 'express';
import { authenticate } from './middlewares/authMiddleware';
import { appDataSource } from "./database/DataSource";

const app: Application = express();
const PORT = process.env.PORT || 3000;

const iotRoutes = require('./routes/iot/IoTRoutes');
const mobileRoutes = require('./routes/mobile/MobileRoutes');

config();   // set env variables from dotenv
app.use(express.json());

app.use(authenticate); // authentication middleware

// assigning routes to the route files
app.use('/iot', iotRoutes);
app.use('/mobile', mobileRoutes);

// starting the database and the server
appDataSource.initialize().then(async (dataSource: any) => {
    await dataSource.runMigrations().then(async () => {
        console.log('Migrations run successfully');
        app.listen(PORT);
        console.log(`Server is listening on port ${PORT}`);
    }).catch((error: any) => {
        // catching errors from migrations
        console.log('Error running migrations');
        console.error(error);
    });
}).catch((error: any) => {
    // catching errors from dataSource initialization
    console.log('Error initializing dataSource');

    console.error(error);
});


// app.listen(PORT);
// console.log(`Server is listening on port ${PORT}`);



// const queryRunner: QueryRunner = await appDataSource.createQueryRunner();
// const result = await queryRunner.query(
//     `SELECT * from migrations;`
// );
// await console.log(result);