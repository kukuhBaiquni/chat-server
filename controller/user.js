const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')
const jwt = require('jsonwebtoken')
const { Users } = require('../models')

module.exports = {
  async createUser(req, res) {
    const { name, email, password } = req.body
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const random = Math.floor(Math.random() * 70) + 1
      const id = nanoid()
      if (hashedPassword) {
        const user = await Users.find({
          where: {
            email,
          },
        })
        if (user) {
          res.status(409).json({
            success: false,
            message: 'Registration failed: Email already exist',
          })
        } else {
          await Users.create({
            id,
            name,
            email,
            image: `https://i.pravatar.cc/100?img=${random}`,
            password: hashedPassword,
          })

          res.status(201).json({
            success: true,
            message: 'Registration success: User created',
          })
        }
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
          data: null,
        })
      }
    } catch (error) {
      res.status(500).send(error)
    }
  },
  async getUser(_, res) {
    const data = await Users.findAll()
    if (data) {
      res.status(200).json({
        success: true,
        message: 'Data successfully retrieved',
        data,
      })
    }
  },
  async deleteAllUser(_, res) {
    await Users.destroy({
      where: {},
      truncate: true,
    })
    res.status(200).json({
      success: true,
      message: 'All data successfully deleted',
    })
  },
  async loginUser(req, res) {
    const { email, password } = req.body
    try {
      const user = Users.find({
        where: {
          email,
        },
      })
      if (user) {
        const isMatchPassword = await bcrypt.compare(password, user.password)
        if (isMatchPassword) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
          user.token = token
          await user.save()
          res.status(200).json({
            success: true,
            message: 'Authentication success: Access granted',
          })
        } else {
          res.status(401).json({
            success: false,
            message: 'Authentication failed: Invalid Email or Password',
          })
        }
      } else {
        res.status(401).json({
          success: false,
          message: 'Authentication failed: Invalid Email or Password',
        })
      }
    } catch (error) {
      res.status(500).send(error)
    }
  },
}
