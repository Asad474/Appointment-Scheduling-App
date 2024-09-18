import express from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
} from '../controllers/user.js';
import protect from '../middleware/auth.js';
import { loginValidaor, registerValidator, updateUserValidator } from '../utils/validators/user.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

router.post(
    '/register',
    registerValidator,
    validateRequest, 
    registerUser
);

router.post(
    '/login',
    loginValidaor,
    validateRequest,
    loginUser
);

router.post('/logout', logoutUser);
router.route('/userprofile')
    .get(protect, getUserProfile)
    .patch(protect, updateUserValidator, validateRequest, updateUserProfile);

export default router;