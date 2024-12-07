import { Router } from 'express'
import { addChannel, deleteChannel, getAllChannels, getChannelById, getChannelByUserId, updateChannel } from '../controllers/channelController.js'

const router = Router()

router.route('/user/:id').get(getChannelByUserId)
router.route('/channel/:id').get(getChannelByUserId)
router.route("/:id").get(getChannelById).post(updateChannel).delete(deleteChannel)
router.route("/").post(addChannel).get(getAllChannels)

export default router