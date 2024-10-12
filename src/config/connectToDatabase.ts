import mongoose from "mongoose"

export const connectToDB = async (connectionStr: string) => {
    await mongoose.connect(connectionStr)
        .then(() => {
            console.log('connected to database...')
        })
        .catch((e) => {
            console.error(e)
        })
}