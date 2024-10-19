import express from 'express'
import cors from 'cors'
import routes from './api/routes/routes.js'
import { config } from './config/config.js';
const app = express()

app.use(
    cors({
      origin: [config.ORIGIN],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  )
app.use(express.json())
routes(app)
export default app