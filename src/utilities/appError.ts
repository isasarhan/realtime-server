import { FORBIDDEN, SERVER_ERROR, UNAUTHORIZED, VALIDATION_ERROR } from "../messages.js"

interface AppErrorOptions {
    message: string
    code?: string
    status?: number
    originalError?: any
}

export class AppError extends Error {
    public status?: number
    public code?: string
    public originalError?: any

    constructor(input: AppErrorOptions) {
        super(input.message)
        this.status = input.status
        this.stack = this.originalError
    }
}

export class APIError extends AppError {
    constructor(error: any) {
        super({ message: SERVER_ERROR, status: STATUS_CODES.INTERNAL_ERROR, code: ErrorCodes.INTERNAL_SERVER_ERROR, originalError: error })
    }
}
export class AuthenticationError extends AppError {
    constructor(message:string) {
        super({ message: message, status: STATUS_CODES.UN_AUTHORISED, code: ErrorCodes.UNAUTHORIZED })
    }
}
export class ForbiddenError extends AppError {
    constructor(error: any) {
        super({ message: FORBIDDEN, status: STATUS_CODES.FORBIDDEN, code: ErrorCodes.FORBIDDEN, originalError: error })
    }
}
export class NotFoundError extends AppError {
    constructor(message: string, error?: any) {
        super({ message: message, status: STATUS_CODES.NOT_FOUND, code: ErrorCodes.NOT_FOUND, originalError: error })
    }
}
export class ValidationError extends AppError {
    constructor(message:string, error?: any) {
        super({ message: message, status: STATUS_CODES.BAD_REQUEST, code: ErrorCodes.VALIDATION_ERROR, originalError: error })
    }
}
export class BadRequestError extends AppError {
    constructor(message: string, error?: any) {
        super({ message: message, status: STATUS_CODES.BAD_REQUEST, code: ErrorCodes.BAD_USER_INPUT, originalError: error })
    }
}

export function isAppError(error: any) {
    if (error instanceof AppError) {
      throw error
    }
  }
  
export const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
}

export const ErrorCodes = {
    VALIDATION_ERROR: 'VALIDATION ERROR',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    BAD_USER_INPUT: 'BAD_USER_INPUT',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
    RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
    INVALID_TOKEN: 'INVALID_TOKEN',
}
