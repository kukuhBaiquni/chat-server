const nodemailer = require('nodemailer')
const fs = require('fs')
const mustache = require('mustache')
const path = require('path')

const sendEmail = async (payload) => {
  const file = path.join(__dirname, '../verification-email.html')
  const template = fs.readFileSync(file, 'utf8')
  const transporter = nodemailer.createTransport({
    auth: {
      pass: process.env.EMAIL_EMITER_PASSWORD,
      user: process.env.EMAIL_EMITER,
    },
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  })
  const mailOptions = {
    from: process.env.EMAIL_EMITER,
    html: mustache.render(template, payload),
    subject: 'Account Activation',
    to: payload.email,
  }
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
