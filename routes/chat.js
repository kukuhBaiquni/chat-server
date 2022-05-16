const express = require('express')

const router = express.Router()

const chat = require('../controller/chat')
const middleware = require('../helpers/middleware')

router.get('/', middleware, chat.getChats)
router.get('/all', middleware, chat.getAllChat)
router.delete('/', middleware, chat.dropChat)

module.exports = router
