import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

export const generateToken = (id:any) => {
    jwt.sign({id}, config.JWT_KEY,{
        expiresIn: '1d'
    })
}