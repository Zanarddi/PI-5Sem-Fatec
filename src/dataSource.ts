import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(`${process.env.MYSQL_PORT}`),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: [],
    migrations: ["build/migration/*{.ts,.js}"],
    subscribers: []
});