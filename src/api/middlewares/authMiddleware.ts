import { NextFunction, Request, Response } from "express"
import JWT, { JwtPayload } from 'jsonwebtoken'
import { config } from "../../config/config.js"
import { APIError, AuthenticationError, NotFoundError } from "../../utilities/appError.js"
import UserRepository from "../../database/repositories/userRepository.js"
import { INVALID_TOKEN, USER_NOT_FOUND } from "../../messages.js"

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    const repo = new UserRepository()
    
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1]

            const decoded = JWT.verify(token, config.JWT_KEY) as string | JwtPayload

            let userId: string

            if (typeof decoded === "string") {
                userId = decoded  
            } else if (typeof decoded === "object" && "id" in decoded) {
                userId = (decoded as JwtPayload).id as string
            } else {
                throw new AuthenticationError(INVALID_TOKEN)
            }

            const user = await repo.findById(userId)
            if(!user)
                throw new NotFoundError(USER_NOT_FOUND)

            req.User = user
        }
        next()
    } catch (error) {
        throw new APIError(error)
    }

}
