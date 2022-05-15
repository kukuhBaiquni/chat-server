const jwt = require('jsonwebtoken')
const { Users } = require('../models')

const { JWT_SECRET } = process.env

const onDisconnected = async ({ token }) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await Users.findOne({
      where: {
        id: decoded.id,
      },
    })
    user.last_seen = new Date()
    user.socket_id = null
    user.save()
    return { id: decoded.id, last_seen: new Date() }
  } catch (error) {
    return {}
  }
}

module.exports = onDisconnected
