import { Router } from 'express'
import { deleteUser, getAllUsers, getUserByEmail, getUserById, updateUser } from '../controllers/userController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = Router()

router.route("/email/:email").get(getUserByEmail)
router.route("/:id").get(getUserById).post(updateUser).delete(deleteUser)
router.route("/").get(verifyToken, getAllUsers)

export default router