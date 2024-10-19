import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import messageService from './services/messageService.js'
import { IMessage } from './interfaces/inedx.js'

const setupSocket = (server: http.Server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: 'http://localhost:3000', 
            methods: ["GET", "POST"],
            credentials: true,
        },
    })

    const userSocketMap = new Map()

    const sendMessage = async (message: IMessage) => {        
        const senderSocketId = userSocketMap.get(message.sender)
        const receiverSocketId = userSocketMap.get(message.receiver)

        const messageData = await messageService.createMessage(message)

        const createdMessage = await messageService.createMessage(message)
        console.log('createdMessage', createdMessage);
        
        if (receiverSocketId && senderSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", messageData)
        }
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

        socket.on("test", () => {
            console.log('Test event received from client')
        })

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${userId} with socket ID: ${socket.id}`)
            userSocketMap.delete(userId)
        })
    })
}

export default setupSocket
