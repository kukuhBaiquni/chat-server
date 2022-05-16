const jwt = require('jsonwebtoken')

const middleware = async (req, res, next) => {
  const { JWT_SECRET } = process.env
  const { authorization } = req.headers
  if (authorization) {
    const token = jwt.verify(authorization, JWT_SECRET)
    if (token) {
      req.self = token?.id
      next()
    } else {
      res.status(401).json({
        success: false,
        message: 'Session expired',
      })
    }
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid session',
    })
  }
}

module.exports = middleware
