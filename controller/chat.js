const Sequelize = require('sequelize')
const { Chats } = require('../models')

const { Op } = Sequelize

module.exports = {
  async getChats(req, res) {
    const { senderId = '', recipientId = '', offset } = req.query
    try {
      const perPage = 25
      const dataInClient = +offset === 0 ? 0 : Math.max(offset, perPage)
      const count = await Chats.count({
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
      })
      const data = await Chats.findAll({
        where: {
          [Op.or]: [
            {
              conversation_id: `${senderId} | ${recipientId}`,
            },
            {
              conversation_id: `${recipientId} | ${senderId}`,
            },
          ],
        },
        order: [['createdAt', 'DESC']],
        limit: perPage,
        offset: dataInClient,
      })
      res.status(200).json({
        success: true,
        message: 'Data succesfully retrieved',
        data,
        totalData: count,
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
  async dropChat(_, res) {
    try {
      await Chats.destroy({
        where: {},
        truncate: true,
      })
      res.status(200).json({
        success: true,
        message: 'All data successfully deleted',
      })
    } catch (error) {
      res.status(500).send(error)
    }
  },
}
