import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

import {connDB} from './config/db.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import consultantRoutes from './routes/consultantRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import availabilityRoutes from './routes/availabilityRoutes.js';

dotenv.config();

const app = express();
const port = 8080;

connDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}))

app.get('/', (req, res) => {
    res.status(200).send('API for Appointment_Scheduling_App');
});

app.use('/api/users', userRoutes);
app.use('/api/consultant', consultantRoutes);
app.use('/api/availabilities', availabilityRoutes);
app.use('/api/appointment', appointmentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});