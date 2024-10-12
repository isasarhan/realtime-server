import { ID, IChannel } from "../interfaces/inedx.js"
import UserRepository from "../database/repositories/userRepository.js"
import ChannelRepository from "../database/repositories/channelRepository.js"
import { APIError, isAppError, NotFoundError } from "../utilities/appError.js"
import { CHANNEL_NOT_FOUND} from "../messages.js"

class ChannelService {

    private repository
    private userRepo

    constructor() {
        this.repository = new ChannelRepository()
        this.userRepo = new UserRepository()
    }

    async createChannel(data: IChannel) {
        try {
            return this.repository.create(data)
        } catch (error: any) {
            throw new APIError(error)
        }
    }
    async updateChannel(id: ID, data: Partial<IChannel>) {
        try {
            const channel = await this.repository.findById(id)
            if (!channel)
                throw new NotFoundError(CHANNEL_NOT_FOUND)

            return await this.repository.update(id, data)
        } catch (error: any) {
            throw new APIError(error)
        }
    }
    async deleteChannel(id: ID) {
        try {
            const channel = await this.repository.findById(id)
            if (!channel)
                throw new NotFoundError(CHANNEL_NOT_FOUND)

            return await this.repository.delete(id)
        } catch (error: any) {
            throw new APIError(error)
        }
    }

    async getChannelById(id: string) {
        try {
            const channel = await this.repository.findById(id)
            if (!channel)
                throw new NotFoundError(CHANNEL_NOT_FOUND)

            return channel
        } catch (error) {
            isAppError(error)
            throw new APIError(error)
        }
    }

}

export default new ChannelService()