const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')
const { User } = require('../models')

console.log(User)
module.exports = {
  async createUser(req, res) {
    const { name, email, password } = req.body
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const random = Math.floor(Math.random() * 70) + 1
      const id = nanoid()
      if (hashedPassword) {
        await User.create({
          id,
          name,
          email,
          image: `https://i.pravatar.cc/100?img=${random}`,
          password: hashedPassword,
        })

        res.status(201).json({
          success: true,
          message: 'Data successfully created',
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
          data: null,
        })
      }
    } catch (error) {
      console.log('ERROR', error)
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
  async deleteAllUser(_, res) {
    await User.destroy({
      where: {},
      truncate: true,
    })
    res.status(200).json({
      success: true,
      message: 'All data successfully deleted',
    })
  },
}
