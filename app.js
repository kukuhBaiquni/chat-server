const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
require('dotenv').config()

const app = express()

app.use(compression())
app.use(helmet())
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (_, res) => res.send('SERVER STATUS: UP'))
app.use('/api/v1/user', require('./routes/user'))
app.use('/api/v1/chat', require('./routes/chat'))
app.use('/api/v1/conversation', require('./routes/conversation'))

module.exports = app
