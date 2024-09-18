import { User } from "../models/index.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { BadRequestError } from "../utils/errors/index.js";

// @desc Register User
// route POST /api/users/register
// @access PUBLIC
export const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists){
        throw new BadRequestError('User already exists...');
    }

    const user = await User.create({ name, email, password });
    
    return res.status(201).json({
        id: user.id,
        name,
        email
    });
});


// @desc Authorize User
// route POST /api/users/login
// @access PUBLIC
export const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user && await user.validPassword(password)) {
        generateToken(res, user.id);

        res.status(200).json({
            id: user.id,
            name: user.name,
            email,
            isConsultant: user.isConsultant,
        });
    } else {
        throw new BadRequestError('Invalid email or password.');
    };
});

// @desc Logutuser
// route POST /api/users/logout
// @access PUBLIC
export const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt_token', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'User logged out successfully' });
});


// @desc GET User Profile
// route GET /api/users/userprofile
// @access PRIVATE
export const getUserProfile = asyncHandler(async(req, res) => {
    const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        isConsultant: req.user.isConsultant,
    }

    res.status(200).json(user);
});


// @desc Update User Profile
// route PUT /api/users/userprofile
// @access PRIVATE
export const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findOne({ where: {id: req?.user.id} });

    if (!user) {
        throw new BadRequestError('User not found.');
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.isConsultant) {
        user.isConsultant = req.body.isConsultant;
    };

    const updated_user = await user.save();

    res.status(201).json({
        id: updated_user.id,
        name: updated_user.name,
        email: updated_user.email,
        isConsultant: updated_user.isConsultant,
    });
});