import { CustomError, NotFoundError } from "../utils/errors/index.js";

export const notFound = (req, res, next) => {
    const error = new NotFoundError(`Not found - ${req.originalUrl}`);
    next(error);
};


export const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        const statusCode = err.getStatusCode();
        return res.status(statusCode).send(err.formatErrors());
    }

    console.log(err);
    return res.status(500).send('Internal Server Error.');
};