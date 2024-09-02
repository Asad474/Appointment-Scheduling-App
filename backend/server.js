import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

import { connDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/error.js';
import setUpRoutes from "./routes/index.js";
dotenv.config();

const app = express();
const port = 8080;

connDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
    origin: [ 'http://localhost:3000', 'http://127.0.0.1:3000' ],
    credentials: true,
}))

app.get('/', (req, res) => {
    res.status(200).send('API for Appointment_Scheduling_App');
});

setUpRoutes(app);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});