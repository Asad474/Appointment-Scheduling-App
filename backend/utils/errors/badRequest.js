import { CustomError } from "./customError.js";

export class BadRequestError extends CustomError {
    constructor (message = "Bad Request") {
        super(message);
    }

    getStatusCode() {
        return 400;
    }

    formatErrors() {
        return {
            message: this.message
        }
    }
}