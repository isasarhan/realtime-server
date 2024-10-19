import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import service from '../../services/userService.js'
import { generateToken } from '../../utilities/jwtToken.js'
import * as validation from '../../utilities/validations/userValidations.js'

export const register = asyncHandler(async (req: Request, res: Response) => {
    const userReq = req.body
    const { error } = validation.add.validate(userReq)

    if (error)
        throw new Error(error.details[0].message)

    const user = await service.createUser(userReq)
    res.json(user)
})

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    console.log(req.body)
    
    const user = await service.login(email, password)
    const token = generateToken(user._id)
    
    res.status(200).json({
        token: token,
        user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            image: user.image,
            color: user.color,
        }
    })
})