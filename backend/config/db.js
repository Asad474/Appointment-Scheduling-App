import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelizeOptions = {
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export const sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);

export const connDB = async() => {
    try {
        await sequelize.sync();
        await sequelize.authenticate();
        console.log(`Connection has been established successfully.`);
    } catch (error) {
        console.error(`Unable to connect to the database : ${error}`);
        process.exit(1);
    }
};