const express = require('express')

const router = express.Router()

const user = require('../controller/user')

router.post('/create-user', user.createUser)
router.get('/get-user', user.getUser)

module.exports = router
