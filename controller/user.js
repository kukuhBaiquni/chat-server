const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')
const { User } = require('../models')

module.exports = {
  async createUser(req, res) {
    await User.sync({ force: true })
    const { name, email, password } = req.body
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      if (hashedPassword) {
        const generated = await User.create({
          id: nanoid(), name, email, password: hashedPassword,
        })

        res.status(201).json({
          success: true,
          message: 'Data successfully created',
          data: generated,
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
          data: null,
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  async getUser(_, res) {
    const data = await User.findAll()
    if (data) {
      res.status(200).json({
        success: true,
        message: 'Data successfully retrieved',
        data,
      })
    }
  },
}
