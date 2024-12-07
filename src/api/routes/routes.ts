import authRouter from './authRouter.js'
import userRouter from './userRouter.js'
import messageRouter from './messageRouter.js'
import channelRouter from './channelRouter.js'
import { notFound, errorHandler } from "../middlewares/errorMiddleware.js"

export default (app: any) => {
    app.use('/api/auth', authRouter)
    app.use('/api/users', userRouter)
    app.use('/api/messages', messageRouter)
    app.use('/api/channels', channelRouter)
    app.use(notFound)
    app.use(errorHandler)
}