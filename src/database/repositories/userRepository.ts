import { ID, IUser } from "../../interfaces/inedx.js"
import User from "../models/UserModel.js"

class UserRepository {

    async create(data: IUser) {
        const user = new User(data)
        return await user.save()
    }

    async update(id: ID, data: Partial<IUser>) {
        return await User.findById(id, { $set: data }, { new: true })
    }

    async delete(id: ID) {
        return await User.findByIdAndDelete(id)
    }

    async findById(id: ID) {
        return await User.findById(id).select("-password")
    }

    async findByEmail(email: string) {
        return await User.findOne({ email })
    }

    async findAll() {
        return await User.find().select("-password")
    }

}

export default UserRepository