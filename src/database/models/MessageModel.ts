import { Schema, model, Document } from 'mongoose'
import { IMessage } from '../../interfaces/inedx.js'

interface IMessageDocument extends IMessage, Document { }

const messageSchema = new Schema<IMessageDocument>({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    messageType: { type: String, enum: ['text', 'audio', 'file'] },
    content: {
        type: String, required() {
            return this.messageType === 'text'
        },
    },
    audioUrl: { type: String },
    fileUrl: { type: String },
    timestamp: { type: Date, default: Date.now() },
})

const Message = model<IMessageDocument>('Message', messageSchema)

export default Message