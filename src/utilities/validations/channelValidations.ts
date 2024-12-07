import Joi from "joi"


export const add = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    members: Joi.array().items(Joi.string().hex().length(24)).required(),
    admins: Joi.array().items(Joi.string().hex().length(24)).required(),
    receiver: Joi.string().hex().length(24),
    messageType: Joi.string(),
    content: Joi.string().allow(),
    audioUrl: Joi.string().allow(),
    timeStamp: Joi.date().optional(),
    messages: Joi.array().items(Joi.string().hex().length(24)).required(),
})
export const edit = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    members: Joi.array().items(Joi.string().hex().length(24)).required(),
    admins: Joi.array().items(Joi.string().hex().length(24)).required(),
    receiver: Joi.string().hex().length(24),
    messageType: Joi.string(),
    content: Joi.string().allow(),
    audioUrl: Joi.string().allow(),
    timeStamp: Joi.date().optional(),
    messages: Joi.array().items(Joi.string().hex().length(24)).required(),
})
