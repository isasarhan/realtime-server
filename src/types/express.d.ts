import { IUserDocument } from "../database/models/UserModel.ts"
import { IUser } from "../interfaces/inedx.ts"

declare global {
    namespace Express {
        interface Request {
            User?: IUser
        }
    }
}
