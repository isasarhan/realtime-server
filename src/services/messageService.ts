import { ID, IMessage } from "../interfaces/inedx.js"
import UserRepository from "../database/repositories/userRepository.js"
import MessageRepository from "../database/repositories/messageRepository.js"
import { APIError, isAppError, NotFoundError } from "../utilities/appError.js"
import { MESSAGE_NOT_FOUND, MESSAGES_NOT_FOUND, RECEIVER_NOT_FOUND, SENDER_NOT_FOUND } from "../messages.js"

class MessageService {

    private repository
    private userRepo

    constructor() {
        this.repository = new MessageRepository()
        this.userRepo = new UserRepository()
    }

    async createMessage(data: IMessage) {
        try {
            const sender = await this.userRepo.findById(data.sender)
            if (!sender)
                throw new NotFoundError(SENDER_NOT_FOUND)

            if (data.receiver) {
                const receiver = await this.userRepo.findById(data.receiver)
                if (!receiver)
                    throw new NotFoundError(RECEIVER_NOT_FOUND)
            }

            return this.repository.create(data)
        } catch (error: any) {
            throw new APIError(error)
        }
    }
    async updateMessage(id: ID, data: Partial<IMessage>) {
        try {
            const message = await this.repository.findById(id)
            if (!message)
                throw new NotFoundError(MESSAGE_NOT_FOUND)

            return await this.repository.update(id, data)
        } catch (error: any) {
            throw new APIError(error)
        }
    }
    async deleteMessage(id: ID) {
        try {
            const message = await this.repository.findById(id)
            if (!message)
                throw new NotFoundError(MESSAGE_NOT_FOUND)

            return await this.repository.delete(id)
        } catch (error: any) {
            throw new APIError(error)
        }
    }

    async getMessageById(id: string) {
        try {
            const message = await this.repository.findById(id)
            if (!message)
                throw new NotFoundError(MESSAGE_NOT_FOUND)

            return message
        } catch (error) {
            isAppError(error)
            throw new APIError(error)
        }
    }

    async getMessages(user1: ID, user2: ID) {
        try {
            const messages = await this.repository.findMessages(user1, user2)
            if (!messages)
                throw new NotFoundError(MESSAGES_NOT_FOUND)
            return messages
        } catch (error) {
            isAppError(error)
            throw new APIError(error)
        }
    }

}

export default new MessageService()