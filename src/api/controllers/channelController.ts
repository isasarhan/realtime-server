import { Request, Response } from 'express'
import { INVALID_ID } from '../../messages.js'
import asyncHandler from 'express-async-handler'
import service from '../../services/channelService.js'
import { isValidId } from '../../utilities/isValidId.js'
import { ValidationError } from '../../utilities/appError.js'
import * as validation from '../../utilities/validations/channelValidations.js'

export const getChannelById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id
    if (!isValidId(id))
        throw new ValidationError(INVALID_ID)

    const channel = await service.getChannelById(id)
    res.json(channel)
})

export const addChannel = asyncHandler(async (req: Request, res: Response) => {
    const userReq = req.body
    const { error } = validation.add.validate(userReq)

    if (error)
        throw new ValidationError(error.details[0].message, error)

    const user = await service.createChannel(userReq)
    res.json(user)
})

export const updateChannel = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id
    if (!isValidId(id))
        throw new ValidationError(INVALID_ID)

    const ChannelReq = req.body
    const { error } = validation.edit.validate(ChannelReq)

    if (error)
        throw new ValidationError(error.details[0].message, error)

    const Channel = await service.updateChannel(id, ChannelReq)
    res.json(Channel)
})

export const deleteChannel = asyncHandler(async (req: Request, res: Response) => {
    const id = req.body.id
    if (!isValidId(id))
        throw new ValidationError(INVALID_ID)

    const Channel = await service.deleteChannel(id)
    res.json(Channel)
})