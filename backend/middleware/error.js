import { CustomError } from "../utils/errors/index.js";

export const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};


export const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        const statusCode = err.getStatusCode();
        return res.status(statusCode).send(err.formatErrors());
    }

    return res.status(500).send('Internal Server Error.');
};