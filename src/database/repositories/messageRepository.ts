import { ID, IMessage } from "../../interfaces/inedx.js"
import Message from "../models/MessageModel.js"

class MessageRepository {

  async create(data: IMessage) {
    const message = new Message(data)
    return await message.save()
  }

  async update(id: ID, data: Partial<IMessage>) {
    return await Message.findById(id, { $set: data }, { new: true })
  }

  async delete(id: ID) {
    return await Message.findByIdAndDelete(id)
  }

  async findById(id: ID) {
    return await Message.findById(id).populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "firstName lastName email _id image color",
      },
    })
  }

  async findAll() {
    return await Message.find().populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "firstName lastName email _id image color",
      },
    })
  }
  async findMessages(user1: ID, user2: ID) {
    return await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ timestamp: 1 });
  }
}

export default MessageRepository