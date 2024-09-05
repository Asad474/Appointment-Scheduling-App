import { body } from "express-validator";

export const registerValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .bail()
        .trim()
        .escape()
        .matches(/^[a-zA-Z ]{2,30}$/)
        .withMessage('Username can only contains alphabets upto 30 characters'),
    
    body('email')    
        .notEmpty()
        .withMessage('Email is required.')
        .bail()
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email is invalid.'),

    body('password')    
        .notEmpty()
        .withMessage('Password is required.')
        .bail()
        .isStrongPassword()
        .withMessage('Password should be atleast 8 characters long and should contain atleast 1 uppercase, lowercase, number and special symbol.')
];

export const loginValidaor = [
    body('email')    
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email is invalid.'),
    
    body('password')    
        .notEmpty()
        .withMessage('Password is required.')
];