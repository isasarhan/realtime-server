import { Router } from 'express';
import { addMessage, deleteMessage, getMessageById, getMessages, updateMessage } from '../controllers/messageController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/:id')
    .get(verifyToken, getMessageById)
    .put(verifyToken, updateMessage)
    .delete(verifyToken, deleteMessage);

router.route('/all/:id').get(verifyToken, getMessages)

router.route('/')
    .post(addMessage);
    
export default router;
