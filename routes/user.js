const express = require('express')

const router = express.Router()

const user = require('../controller/user')

router.get('/', user.getUser)
router.delete('/', user.deleteAllUser)
router.post('/create-user', user.createUser)

module.exports = router
