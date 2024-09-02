import express from 'express';
import {
    allavailabilties,
} from '../controllers/availablity.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, allavailabilties);

export default router;