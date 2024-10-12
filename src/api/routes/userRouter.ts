import { Router } from 'express'
import { deleteUser, getAllUsers, getUserByEmail, getUserById, updateUser } from '../controllers/userController.js'

const router = Router()

router.route("/email/:email").get(getUserByEmail)
router.route("/:id").get(getUserById).post(updateUser).delete(deleteUser)
router.route("/").get(getAllUsers)

export default router