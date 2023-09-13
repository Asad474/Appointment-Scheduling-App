import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
    userAppointments,
    AppointmentDetails,
    createAppointment,
    updateAppointment,
    deleteAppointment
} from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/', protect, userAppointments);
router.get('/:id', protect, AppointmentDetails);
router.post('/create', protect, createAppointment);
router.put('/update/:id', protect, updateAppointment);
router.delete('/delete/:id', protect, deleteAppointment);

export default router;