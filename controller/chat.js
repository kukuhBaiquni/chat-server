const Sequelize = require('sequelize')
const { Chats } = require('../models')

const { Op } = Sequelize

module.exports = {
  async getChats(req, res) {
    const { senderId = '', recipientId = '', page = 1 } = req.query
    try {
      const perPage = 15
      const data = await Chats.findAll({
        where: {
          [Op.and]: [
            {
              conversation_id: {
                [Op.like]: `%${senderId}%`,
              },
            },
            {
              conversation_id: {
                [Op.like]: `%${recipientId}%`,
              },
            },
          ],
        },
        limit: perPage,
        offset: perPage * (page - 1),
      })
      res.status(200).json({
        success: true,
        message: 'Data succesfully retrieved',
        data,
      })
    } catch (error) {
      res.status(500).send(error)
    }
  },
  async getAllChat(_, res) {
    try {
      const chat = await Chats.findAll()
      res.status(200).json({
        success: true,
        message: 'Data successfully retrieved',
        data: chat,
      })
    } catch (error) {
      res.status(500).send(error)
    }
  },
}
