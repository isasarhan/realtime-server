import UserRepository from "../database/repositories/userRepository.js"
import { IUser } from "../interfaces/inedx.js"
import { INVALID_CREDENTIALS, USER_NOT_FOUND } from "../messages.js"
import { APIError, BadRequestError, isAppError, NotFoundError } from "../utilities/appError.js"

class UserService {

    private repository

    constructor() {
        this.repository = new UserRepository()
    }

    async createUser(data: IUser) {
        try {
            const user = await this.repository.findByEmail(data.email)
            if (user)
                throw new Error('user already exist')
            return this.repository.create(data)
        } catch (error: any) {
            throw new APIError(error)
        }
    }
    async updateUser(id: string, data: Partial<IUser>) {
        try {
            const user = await this.repository.findById(id)
            if (!user)
                throw new NotFoundError(USER_NOT_FOUND)

            return await this.repository.update(id, data)
        } catch (error: any) {
            isAppError(error)
            throw new APIError(error)
        }
    }
    async deleteUser(id: string) {
        try {
            const user = await this.repository.findById(id)
            if (!user)
                throw new NotFoundError(USER_NOT_FOUND)
            return await this.repository.delete(id)
        } catch (error: any) {
            isAppError(error)
            throw new APIError(error)
        }
    }
    async login(email: string, password: string) {
        try {
            const user = await this.repository.findByEmail(email)
            if (!user)
                throw new NotFoundError(USER_NOT_FOUND)

            const auth = await user.matchPassword(password)
            if (!auth)
                throw new BadRequestError(INVALID_CREDENTIALS)
            return user
        } catch (error: any) {
            isAppError(error)
            throw new Error(error)
        }
    }
    async getAllUsers() {
        try {
            const users = await this.repository.findAll()
            return users
        } catch (error) {
            isAppError(error)
            throw new APIError(error)
        }
    }
    async getUserById(id: string) {
        try {
            const user = await this.repository.findById(id)
            if (!user)
                throw new NotFoundError(USER_NOT_FOUND)

            return user
        } catch (error) {
            isAppError(error)
            throw new APIError(error)
        }
    }
    async getUserByEmail(email: string) {
        try {
            const user = await this.repository.findByEmail(email)
            if (!user)
                throw new NotFoundError(USER_NOT_FOUND)

            return user
        } catch (error) {
            isAppError(error)
            throw new APIError(error)
        }
    }


}

export default new UserService()