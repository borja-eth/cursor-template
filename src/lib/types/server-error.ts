export enum SERVER_ERRORS {
    UNHANDLED_ERROR = "UNHANDLED_ERROR",
    UNAUTHORIZED = "UNAUTHORIZED",
}

export class ServerError extends Error {
    constructor(msg: SERVER_ERRORS) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ServerError.prototype);
    }

    getErrorCode(): SERVER_ERRORS {
        return this.message as SERVER_ERRORS;
    }
}
