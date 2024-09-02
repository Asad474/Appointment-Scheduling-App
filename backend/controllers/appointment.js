import asyncHandler from "express-async-handler";
import { User, Appointment, Consultant } from "../models/index.js";
import sendMail from "../utils/sendingEmail.js";
import { BadRequestError } from "../utils/errors/index.js";

// @desc User all appointments
// route GET /api/appointment
// @access PRIVATE
export const userAppointments = asyncHandler(async(req, res) => {
    const appointments = await Appointment.findAll({
        where: { UserId: req.user.id },
        include: [
            {
                model: Consultant, 
                attributes: [ 'UserId' ],
                include: [{ model: User, attributes: [ 'name', 'email' ] }]
            },
        ],
    });

    if (!appointments) {
        throw new BadRequestError(`${req.user.name} has no appointments`);
    };

    res.status(200).json(appointments);
})


// @desc User particular appointment
// route GET /api/appointment/:id
// @access PRIVATE
export const AppointmentDetails = asyncHandler(async(req, res) => {
    const appointment = await Appointment.findOne({
        where: { id: req.params.id, UserId: req.user.id }
    });

    if (!appointment) {
        throw new BadRequestError('Appointment does not exist.');
    };

    res.status(200).json({
        id: appointment.id,
        date: appointment.date,
        time: appointment.time,
        UserId: appointment.UserId,
        ConsultantId: appointment.ConsultantId,
    });
});


// @desc Create Appointment
// route POST /api/create
// @access PRIVATE
export const createAppointment = asyncHandler(async(req, res) => {
    const { date, time, ConsultantId } = req.body;

    if (!date || !time || !ConsultantId){
        throw new BadRequestError('All input details are required.');
    };

    const consultant = await Consultant.findOne({
        where: { id: ConsultantId },
        include: [{ model: User, attributes: [ 'name', 'email' ] }]
    });

    if (!consultant) {
        throw new BadRequestError('Consultant does not exist.');
    };

    if (consultant.UserId === req.user.id) {
        throw new BadRequestError('Consultant cannot make an appointment for himself/herself.');
    };

    const appointmentExists = await Appointment.findOne({
        where: { date, time, consultantId: consultant.id }
    });

    if (appointmentExists) {
        throw new BadRequestError('Appointment with the given date, time and consultant already exist.');
    };

    const appointment = await Appointment.create({
        date,
        time,
        UserId: req.user.id,
        ConsultantId: consultant.id
    });

    const subject = `Appointment with ${consultant.User.name}`;
    const text = `Your have an appointment with Consultant ${consultant.User.name} on ${appointment.date} at ${appointment.time}`;

    sendMail(res, req.user.email, subject, text);

    res.status(201).json({
        id: appointment.id,
        date: appointment.date,
        time: appointment.time,
        userId: appointment.UserId,
        consultantId: appointment.ConsultantId,
    });
});


// @desc Update Appointment
// route PUT /api/appointment/update/:id
// @access PRIVATE
export const updateAppointment = asyncHandler(async(req, res) => {
    const { date, time } = req.body;

    const appointment = await Appointment.findOne({
        where: { id: req.params.id, userId: req.user.id },
    });

    if (!appointment) {
        throw new BadRequestError('Appointment does not exist.');
    };

    const consultant = await Consultant.findOne({
        where: { id: appointment.ConsultantId },
        include: [{ model: User, attributes: [ 'name', 'email' ] }]
    });

    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;

    appointment.save();

    const subject = `Appointment with ${consultant.User.name}`;
    const text = `Your appointment has been updated with Consultant ${consultant.User.name} on ${appointment.date} at ${appointment.time}`;

    sendMail(res, req.user.email, subject, text);

    res.status(201).json({
        id: appointment.id,
        date: appointment.date,
        time: appointment.time,
        userId: appointment.UserId,
        consultantId: appointment.ConsultantId,
    });
});


// @desc Delete Appointment
// route DELETE /api/appointment/delete/:id
// @access PRIVATE
export const deleteAppointment = asyncHandler(async(req, res) => {
    const appointment = await Appointment.findOne({
        where: {id: req.params.id, userId: req.user.id},
    });

    if (!appointment){
        throw new BadRequestError('Appointment does not exist.');
    };

    const consultant = await Consultant.findOne({
        where: { id: appointment.ConsultantId },
        include: [{ model: User, attributes: ['name', 'email'] }]
    });

    const subject = `Appointment with ${consultant.User.name}`;
    const text = `Your appointment with Consultant ${consultant.User.name} on ${appointment.date} at ${appointment.time} has been deleted successfully.`;

    sendMail(res, req.user.email, subject, text);
    appointment.destroy();
      
    res.status(200).json({ message: 'Appointment has been deleted successfully.' });
});