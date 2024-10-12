import { Request, Response } from 'express'
import { INVALID_ID } from '../../messages.js'
import asyncHandler from 'express-async-handler'
import service from '../../services/messageService.js'
import { isValidId } from '../../utilities/isValidId.js'
import { ValidationError } from '../../utilities/appError.js'
import * as validation from '../../utilities/validations/messageValidations.js'

export const getMessageById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id
    if (!isValidId(id))
        throw new ValidationError(INVALID_ID)

    const Message = await service.getMessageById(id)
    res.json(Message)
})

export const addMessage = asyncHandler(async (req: Request, res: Response) => {
    const userReq = req.body
    const { error } = validation.add.validate(userReq)

    if (error)
        throw new ValidationError(error.details[0].message, error)

    const user = await service.createMessage(userReq)
    res.json(user)
})

export const updateMessage = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id
    if (!isValidId(id))
        throw new ValidationError(INVALID_ID)

    const MessageReq = req.body
    const { error } = validation.edit.validate(MessageReq)

    if (error)
        throw new ValidationError(error.details[0].message, error)

    const Message = await service.updateMessage(id, MessageReq)
    res.json(Message)
})

export const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
    const id = req.body.id
    if (!isValidId(id))
        throw new ValidationError(INVALID_ID)

    const Message = await service.deleteMessage(id)
    res.json(Message)
})