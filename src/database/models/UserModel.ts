import { Schema, model, Document } from 'mongoose'
import { IUser } from '../../interfaces/inedx.js'
import bcrypt from 'bcryptjs'

export interface IUserDocument extends IUser, Document {
    matchPassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUserDocument>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    color: { type: Number },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified("password"))
        return next()

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

const User = model<IUserDocument>('User', userSchema)

export default User