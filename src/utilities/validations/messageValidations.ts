import Joi from "joi"


export const add = Joi.object({
    sender:  Joi.string().hex().length(24),
    receiver:  Joi.string().hex().length(24),
    messageType: Joi.string(),
    content: Joi.string().allow(),
    audioUrl: Joi.string().allow(),
    fileUrl: Joi.string().allow(),
    timeStamp: Joi.date().allow(),
})

export const edit = Joi.object({
    sender:  Joi.string().hex().length(24),
    receiver:  Joi.string().hex().length(24),
    messageType: Joi.string(),
    content: Joi.string().allow(),
    audioUrl: Joi.string().allow(),
    fileUrl: Joi.string().allow(),
    timeStamp: Joi.date().allow(),
})