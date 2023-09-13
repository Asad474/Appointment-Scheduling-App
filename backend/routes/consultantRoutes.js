import express from "express";
import {
    getConsultant,
    availability,
    updateAvailability,
} from '../controllers/consultantController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', protect, getConsultant);
router.route('/availability')
    .post(protect, availability)    
    .put(protect, updateAvailability);

export default router;