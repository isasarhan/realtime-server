import http from 'http'
import app from '../app.js'
import { config } from '../config/config.js'
import { connectToDB } from '../config/connectToDatabase.js'
import setupSocket from '../socket.js'


const normalizePort = (val: any) => {
    const port = parseInt(val, 10)
    if (isNaN(port)) return val // Named pipe
    if (port >= 0) return port // Port number
    return false
}

const port = normalizePort(config.PORT)
app.set('port', port)
const server = http.createServer(app)
connectToDB(config.DB).then(()=>{
    server.listen(port,()=>{
        console.log(`server running on port ${port}....`)
    }).on('listening',()=>{
        setupSocket(server)
    })
})