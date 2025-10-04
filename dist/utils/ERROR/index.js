"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbeddibnException = exports.BadRequestException = exports.UnauthorizedException = exports.NotFoundException = exports.ConflictException = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    errorDetails;
    constructor(message, statusCode, errorDetails) {
        super(message);
        this.statusCode = statusCode;
        this.errorDetails = errorDetails;
    }
}
exports.AppError = AppError;
class ConflictException extends AppError {
    errorDetails;
    constructor(message, errorDetails) {
        super(message, 409, errorDetails);
        this.errorDetails = errorDetails;
    }
}
exports.ConflictException = ConflictException;
class NotFoundException extends AppError {
    errorDetails;
    constructor(message, errorDetails) {
        super(message, 404, errorDetails);
        this.errorDetails = errorDetails;
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends AppError {
    errorDetails;
    constructor(message, errorDetails) {
        super(message, 401, errorDetails);
        this.errorDetails = errorDetails;
    }
}
exports.UnauthorizedException = UnauthorizedException;
class BadRequestException extends AppError {
    errorDetails;
    constructor(message, errorDetails) {
        super(message, 400, errorDetails);
        this.errorDetails = errorDetails;
    }
}
exports.BadRequestException = BadRequestException;
class forbeddibnException extends AppError {
    errorDetails;
    constructor(message, errorDetails) {
        super(message, 403, errorDetails);
        this.errorDetails = errorDetails;
    }
}
exports.forbeddibnException = forbeddibnException;
