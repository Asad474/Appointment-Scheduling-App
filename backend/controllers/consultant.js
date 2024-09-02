import asyncHandler from 'express-async-handler';
import { User, Consultant } from '../models/index.js';
import { BadRequestError, UnauthorizedError } from '../utils/errors/index.js';


// @desc Consultant Info
// route GET /api/consultant/:id
// @access PRIVATE
export const getConsultant = asyncHandler(async(req, res) => {
    const consultant = await Consultant.findOne({
        where: { UserId: req.params.id },
        include: [{ model: User, attributes: ['name', 'email'] }],
    });

    if (!consultant){
        throw new UnauthorizedError('Consultant does not exist.');
    };

    res.status(200).json({
        id: consultant.id,
        start_time: consultant.start_time,
        end_time: consultant.end_time,
        breaks: consultant.breaks,
        DaysOff: consultant.DaysOff,
        userId: consultant.UserId,
        user: consultant.User,
    });
});


// @desc Post Consultant Availability
// route POST /api/consultant/availability
// @access PRIVATE
export const availability = asyncHandler(async(req, res) => {
    if (!req.user.isConsultant){
        throw new UnauthorizedError('User not authorized.');
    };

    const availabilityExists = await Consultant.findOne({
        where: { UserId: req.user.id }
    });

    if (availabilityExists){
        throw new BadRequestError('Consultant can have only one availability.');
    };

    const { start_time, end_time, breaks, DaysOff } = req.body;

    if (!start_time || !end_time || !breaks || !DaysOff){
        throw new BadRequestError('All input details are required'); 
    };

    const obj = await Consultant.create({
        start_time, 
        end_time, 
        breaks, 
        DaysOff,
        UserId: req.user.id,
    });

    if (obj) {
        res.status(201).json({
            start_time: obj.start_time,
            end_time: obj.end_time,
            breaks: obj.breaks,
            DaysOff: obj.DaysOff,
        });
    } else {
        throw new BadRequestError('Invalid Consultant data.');
    }
});

// @desc Update Consultant Availability
// route PUT /api/consultant/availability
// @access PRIVATE
export const updateAvailability = asyncHandler(async(req, res) => {
    if (!req.user.isConsultant){
        throw new UnauthorizedError('User not authorized.');
    };

    const obj = await Consultant.findOne({
        where: { UserId: req.user.id },
        include: [{ model: User, attributes: ['name', 'email'] }]
    });

    if (!obj) {
        throw new BadRequestError('Consultant does not have availability.');
    }

    obj.start_time = req.body.start_time || obj.start_time;
    obj.end_time = req.body.end_time || obj.end_time;
    obj.breaks = req.body.breaks || obj.breaks;
    obj.DaysOff = req.body.DaysOff || obj.DaysOff;

    const updated_obj = await obj.save();

    res.status(201).json({
        Consultant: updated_obj.User.name,
        start_time: updated_obj.start_time,
        end_time: updated_obj.end_time,
        breaks: updated_obj.breaks,
        DaysOff: updated_obj.DaysOff,
    });
});