import { Router } from 'express'
import { addChannel, deleteChannel, getChannelById, updateChannel } from '../controllers/channelController.js'

const router = Router()

router.route("/:id").get(getChannelById).post(updateChannel).delete(deleteChannel)
router.route("/").post(addChannel)

export default router