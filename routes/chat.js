const express = require('express')

const router = express.Router()

const chat = require('../controller/chat')

router.get('/', chat.getChats)
router.get('/all', chat.getAllChat)

module.exports = router
