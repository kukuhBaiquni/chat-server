const { nanoid } = require('nanoid')
const { Chats, Users } = require('../models')

const createChat = async ({ recipientId, senderId, text }) => {
  try {
    const id = nanoid()
    const targetUser = await Users.findOne({
      where: {
        id: recipientId,
      },
    })
    if (targetUser) {
      const chat = await Chats.create({
        id,
        user_id: senderId,
        conversation_id: `${senderId} | ${recipientId}`,
        text,
      })
      return {
        data: chat,
        recipientId,
        senderId,
      }
    }
    return null
  } catch (error) {
    return {}
  }
}

module.exports = createChat
