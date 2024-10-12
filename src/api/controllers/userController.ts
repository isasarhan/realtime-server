import { Request, Response } from 'express'
import { INVALID_ID } from '../../messages.js'
import asyncHandler from 'express-async-handler'
import service from '../../services/userService.js'
import { isValidId } from '../../utilities/isValidId.js'
import { ValidationError } from '../../utilities/appError.js'
import * as validation from '../../utilities/validations/userValidations.js'

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id
    if (!isValidId(id))
        throw new ValidationError(INVALID_ID)

    const user = await service.getUserById(id)
    res.json(user)
})
 
export const getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
    const email = req.params.email
    const user = await service.getUserByEmail(email)
    res.json(user)
})

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await service.getAllUsers()
    res.status(200).json(users)
})

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id
    if (!isValidId(id))
        throw new ValidationError(INVALID_ID)

    const userReq = req.body
    const { error } = validation.edit.validate(userReq)

    if (error)
        throw new ValidationError(error.details[0].message, error)

    const user = await service.updateUser(id, userReq)
    res.json(user)
})

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const id = req.body.id
    if (!isValidId(id))
        throw new ValidationError(INVALID_ID)

    const user = await service.deleteUser(id)
    res.json(user)
})