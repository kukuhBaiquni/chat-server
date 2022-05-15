const Sequelize = require('sequelize')
const { nanoid } = require('nanoid')
const { Conversations } = require('../models')

const { Op } = Sequelize

module.exports = {
  async createConversation(req, res) {
    try {
      const { senderId, recipientId } = req.body
      const conversation = await Conversations.findOne({
        where: {
          [Op.and]: [
            {
              user_group: {
                [Op.like]: `%${senderId}%`,
              },
            },
            {
              user_group: {
                [Op.like]: `%${recipientId}%`,
              },
            },
          ],
        },
      })
      if (conversation) {
        res.status(200).json({
          success: false,
          message: 'Conversation between these user already created',
          conversation_id: conversation.id,
        })
      } else {
        const id = nanoid()
        await Conversations.create({
          id,
          user_group: `${senderId}|${recipientId}`,
        })
        res.status(201).json({
          success: true,
          message: 'Conversation created',
          conversation_id: id,
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  async getConversation(req, res) {
    try {
      const { senderId, recipientId } = req.query
      const conversation = await Conversations.findOne({
        where: {
          [Op.and]: [
            {
              user_group: {
                [Op.like]: `%${senderId}%`,
              },
            },
            {
              user_group: {
                [Op.like]: `%${recipientId}%`,
              },
            },
          ],
        },
      })
      if (conversation) {
        res.status(200).json({
          success: true,
          message: 'Data successfully retrieved',
          data: conversation,
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Conversation not found',
        })
      }
    } catch (error) {
      res.status(500).send(error)
    }
  },
}
