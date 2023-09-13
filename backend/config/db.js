import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
        port: process.env.DATABASE_PORT
    }
);

const connDB = async() => {
    try {
        await sequelize.authenticate();
        console.log(`Connection has been established successfully.`);
    } catch (error) {
        console.error(`Unable to connect to the database : ${error}`);
        process.exit(1);
    }
};

export {connDB, sequelize};