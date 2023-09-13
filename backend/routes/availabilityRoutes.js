import express from 'express';
import {
    allavailabilties,
} from '../controllers/availablityController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, allavailabilties);

export default router;