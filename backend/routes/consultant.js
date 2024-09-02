import express from "express";
import {
    getConsultant,
    availability,
    updateAvailability,
} from '../controllers/consultant.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', protect, getConsultant);
router.route('/availability')
    .post(protect, availability)    
    .put(protect, updateAvailability);

export default router;