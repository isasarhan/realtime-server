import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { config } from './config/config.js'
import { IMessage } from './interfaces/inedx.js'
import messageService from './services/messageService.js'

const setupSocket = (server: http.Server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: config.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        },
    })

    const userSocketMap = new Map()
    const sendMessage = async (message: IMessage) => {

        console.log('message');
        
        const senderSocketId = userSocketMap.get(message.sender)
        const receiverSocketId = userSocketMap.get(message.receiver)
        console.log('senderSocketId', senderSocketId)
        console.log('receiverSocketId', receiverSocketId)
        
        const messageData = await messageService.createMessage(message)
        console.log(messageData);
        
        if (receiverSocketId && senderSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", messageData)
        }
    }
    const testFn = ()=>{
        console.log('test');
        
    }
    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId

        if (userId) {
            userSocketMap.set(userId, socket.id)
            console.log(`User connected: ${userId} with socket ID: ${socket.id}`)
        } else {
            console.log("User ID not provided during connection.")
        }

        socket.on("sendMessage", sendMessage)
        socket.on("test", testFn)

    })
}

export default setupSocket