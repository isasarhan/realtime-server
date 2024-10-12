import { Router } from 'express'
import { addMessage, deleteMessage, getMessageById, updateMessage } from '../controllers/messageController.js'

const router = Router()

router.route("/:id").get(getMessageById).post(updateMessage).delete(deleteMessage)
router.route("/").post(addMessage)

export default router