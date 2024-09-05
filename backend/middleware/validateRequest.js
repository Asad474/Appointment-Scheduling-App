import { validationResult } from "express-validator"
import { RequestValidationError } from "../utils/errors/index.js";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        console.log(errors);
        throw new RequestValidationError(errors.array());
    }

    next();
}