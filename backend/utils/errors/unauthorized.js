import { CustomError } from "./customError.js";

export class UnauthorizedError extends CustomError {
    constructor (message = "Unauthorized") {
        super(message);
    }

    getStatusCode() {
        return 401;
    }

    formatErrors() {
        return {
            message: this.message
        }
    }
}