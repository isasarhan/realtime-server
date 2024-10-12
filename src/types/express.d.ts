import { IUserDocument } from "../database/models/UserModel.ts"

declare global {
    namespace Express {
        interface Request {
            User?: IUserDocument
        }
    }
}
