import dotenv from 'dotenv'

dotenv.config()

const DB = process.env.DB || ''
const DEVELOPMENT = process.env.NODE_ENV
const JWT_KEY = process.env.JWT_KEY || 'secret123'
const PORT  = process.env.PORT || 4000
const ORIGIN = 'http://localhost:3000'

export const config = {
    DB,
    DEVELOPMENT,
    JWT_KEY, 
    PORT,
    ORIGIN
}