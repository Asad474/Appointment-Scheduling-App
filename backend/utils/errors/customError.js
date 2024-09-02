export class CustomError extends Error {
    constructor(message) {
        super(message);

        if (this.constructor === CustomError) {
            throw new Error('Custom Error class is of abstract type and cannot be instantiated. ');
        }
    }

    getStatusCode() {
        throw new Error('Status Code cannot be directly set in custom error class.');
    }

    formatErrors() {
        throw new Error('formatErrors() cannot be directly set in custom error class.');
    }
}