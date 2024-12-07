import { Schema } from "mongoose"

export interface IChannel {
    name: string
    members: Schema.Types.ObjectId[]
    admins: Schema.Types.ObjectId[]
    createdAt?: Date
    updatedAt?: Date
    messages?: Schema.Types.ObjectId[]
    description?: string
}

export interface IMessage {
    sender: Schema.Types.ObjectId | string,
    receiver?: Schema.Types.ObjectId | string,
    messageType: string,
    content?: string,
    audioUrl?: string,
    fileUrl?: string,
    timestamp?: Date,
    channelId?: ID,
}
export interface IUser {
    _id: ID;
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    image: string,
    color: number,
}

export type ID = string | Schema.Types.ObjectId