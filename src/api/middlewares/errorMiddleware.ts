import { Request, Response, NextFunction } from "express"
import { AppError } from "../../utilities/appError.js"
import { config } from "../../config/config.js"


export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError)
        return res.status(error.status || 500).json({
            message: error.message,
            code: error.code,
            stack: config.DEVELOPMENT === 'development' ? error.stack : '',
        })

    return res.status(500).json({
        code: 'error',
        message: error.message || 'Internal Server Error',
        stack: config.DEVELOPMENT === 'development' ? error.stack : '',
    })
}