const jwt = require('jsonwebtoken')
const { Users } = require('../models')

const { JWT_SECRET } = process.env

const onConnected = async ({ token, socketId }) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await Users.findOne({
      where: {
        id: decoded.id,
      },
    })
    user.last_seen = null
    user.socket_id = socketId
    user.save()
    return {
      id: decoded.id,
      name: user.name,
      email: user.email,
      image: user.image,
      is_verified: user.is_verified,
      last_seen: user.last_seen,
    }
  } catch (error) {
    return {}
  }
}

module.exports = onConnected
