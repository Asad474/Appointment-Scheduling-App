import { CustomError } from "./customError.js";

export class NotFoundError extends CustomError {
    constructor (message = "Bad Request") {
        super(message);
    }

    getStatusCode() {
        return 404;
    }

    formatErrors() {
        return {
            message: this.message
        }
    }
}