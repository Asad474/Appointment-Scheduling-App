import { CustomError } from "./customError.js";

export class RequestValidationError extends CustomError {
    constructor (message) {
        super('Validation Error');
        this.message = message;
    }

    getStatusCode() {
        return 400;
    }

    formatErrors() {
        return {
            message: this.message[0].msg
        }
    }
}