import asyncHandler from 'express-async-handler';
import Consultant from '../models/consultantModel.js';
import User from '../models/userModel.js';

// @desc All Consultant Availabilities
// route GET /api/availabilities
// @access PRIVATE
const allavailabilties = asyncHandler(async(req, res) => {
    const consultant_availablities = await Consultant.findAll({
        include: [{model: User, attributes: ['name', 'email', 'isConsultant']}],
    });

    res.status(200).json(consultant_availablities);
});

export {
    allavailabilties,
};