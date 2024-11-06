export class ApiError extends Error {
    status = 500;

    constructor(message: string, status?: number) {
        super(message);
        this.status = status || 500;
        Error.captureStackTrace(this, this.constructor)
    }
}
