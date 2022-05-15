const express = require('express')

const router = express.Router()

const conversation = require('../controller/conversation')

router.get('/', conversation.getConversation)
router.post('/create-conversation', conversation.createConversation)

module.exports = router
