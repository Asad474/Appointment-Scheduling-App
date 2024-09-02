import asyncHandler from 'express-async-handler';
import { User, Consultant } from '../models/index.js';

// @desc All Consultant Availabilities
// route GET /api/availabilities
// @access PRIVATE
export const allavailabilties = asyncHandler(async(req, res) => {
    const consultant_availablities = await Consultant.findAll({
        include: [{ model: User, attributes: ['name', 'email', 'isConsultant'] }],
    });

    res.status(200).json(consultant_availablities);
});