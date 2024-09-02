import express from 'express';
import protect from '../middleware/auth.js';
import {
    userAppointments,
    AppointmentDetails,
    createAppointment,
    updateAppointment,
    deleteAppointment
} from '../controllers/appointment.js';

const router = express.Router();

router.get('/', protect, userAppointments);
router.get('/:id', protect, AppointmentDetails);
router.post('/create', protect, createAppointment);
router.put('/update/:id', protect, updateAppointment);
router.delete('/delete/:id', protect, deleteAppointment);

export default router;