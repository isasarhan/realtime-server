import { Schema, model, Document } from 'mongoose'
import { IChannel } from '../../interfaces/inedx.js'

interface IChannelDocument extends IChannel, Document { }

const channelSchema = new Schema<IChannelDocument>({
    name: { type: String, required: true },
    members: { type: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }] },
    admins: { type: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }] },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    messages: { type: [{ type: Schema.Types.ObjectId, ref: 'Messages', required: true }] },
    description: { type: String },
})

const Channel = model<IChannelDocument>('Channel', channelSchema)

export default Channel
