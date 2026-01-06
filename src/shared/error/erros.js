export class AppError extends Error {
  constructor(
    message,
    statusCode = 500,
    errorCode = null,
    isOperational = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message, details) {
    super(message, 400, "VALIDATION_ERROR", true);
    this.details = details;
  }
}

export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND_ERROR", true);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED_ERROR", true);
  }
}

export class BussinessError extends AppError {
  constructor(message, statusCode = 400, errorCode = "BUSINESS_ERROR") {
    super(message, statusCode, errorCode, true);
  }
}

export const errorCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED_ERROR: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

export const {
  BAD_REQUEST,
  UNAUTHORIZED_ERROR,
  PAYMENT_REQUIRED,
  FORBIDDEN,
  NOT_FOUND,
  METHOD_NOT_ALLOWED,
  UNPROCESSABLE_CONTENT,
  TOO_MANY_REQUESTS,
  INTERNAL_SERVER_ERROR,
} = errorCodes;
