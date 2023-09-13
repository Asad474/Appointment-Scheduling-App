import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async(req, res, next) => {
    const token = req.cookies.jwt_token;

    if (token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findOne({
                where: {id: decoded.userId},
                attributes: {exclude: ['password']},
            });

            console.log(req.user);

            next();

        } catch{
            res.status(401);
            throw new Error('Unauthorized, Invalid Token.');
        }
    } else{
        res.status(401);
        throw new Error('Unauthorized, No Token.');
    };
});

export default protect;