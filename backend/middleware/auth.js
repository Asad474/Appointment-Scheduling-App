import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { UnauthorizedError } from "../utils/errors/index.js";
import { User } from "../models/index.js";

const protect = asyncHandler(async(req, res, next) => {
    const token = req.cookies.jwt_token;

    if (token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findOne({
                where: { id: decoded.userId },
                attributes: { exclude: ['password'] },
            });

            next();

        } catch {
            throw new UnauthorizedError('Unauthorized, Invalid Token.');
        }
    } else {
        throw new UnauthorizedError('Unauthorized, No Token.');
    };
});

export default protect;