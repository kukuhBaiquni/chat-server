const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')
const jwt = require('jsonwebtoken')
const { Users } = require('../models')
const sendEmail = require('../helpers/send-email')

const { CLIENT_URL, JWT_SECRET } = process.env

module.exports = {
  async createUser(req, res) {
    const { name, email, password } = req.body
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const random = Math.floor(Math.random() * 70) + 1
      const id = nanoid()
      if (hashedPassword) {
        const user = await Users.findOne({
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
          const generatedUser = await Users.create({
            id,
            name,
            email,
            image: `https://i.pravatar.cc/100?img=${random}`,
            password: hashedPassword,
            is_verified: false,
          })

          const generatedID = nanoid()
          generatedUser.verification_code = generatedID
          await generatedUser.save()

          sendEmail({
            email,
            name,
            url: `${CLIENT_URL}/verify?token=${generatedID}`,
          })

          res.status(201).json({
            success: true,
            message: 'Registration success: Please verify your email',
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
      const user = await Users.findOne({
        where: {
          email,
        },
      })

      if (user) {
        if (!user.is_verified) {
          res.status(203).json({
            success: false,
            message: 'Email verification is required',
          })
          return
        }
        const isMatchPassword = await bcrypt.compare(password, user.password)
        if (isMatchPassword) {
          const token = jwt.sign({ id: user.id }, JWT_SECRET)
          user.token = token
          await user.save()
          res.status(200).json({
            success: true,
            message: 'Authentication success: Access granted',
            token,
          })
        } else {
          res.status(403).json({
            success: false,
            message: 'Authentication failed: Invalid Email or Password',
          })
        }
      } else {
        res.status(403).json({
          success: false,
          message: 'Authentication failed: Invalid Email or Password',
        })
      }
    } catch (error) {
      res.status(500).send(error)
    }
  },
  async verifyUser(req, res) {
    const { query } = req
    try {
      const user = await Users.findOne({
        where: {
          verification_code: query.token,
        },
      })
      if (user) {
        user.verification_code = null
        user.is_verified = true
        await user.save()
        res.status(200).json({
          success: true,
          message:
            'Your email successfully verified, please login to start chat',
        })
      } else {
        res.status(400).json({
          success: false,
          message: 'Invalid token',
        })
      }
    } catch (error) {
      res.status(500).send(error)
    }
  },
}
