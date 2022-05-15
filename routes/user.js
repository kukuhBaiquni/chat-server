const express = require('express')

const router = express.Router()

const user = require('../controller/user')

router.get('/', user.getUser)
router.delete('/', user.deleteAllUser)
router.post('/create-user', user.createUser)
router.post('/login', user.loginUser)
router.get('/verify', user.verifyUser)
router.get('/self', user.getUserOne)
router.get('/other', user.getOtherUser)
router.get('/get-by-token', user.getUserByToken)

module.exports = router
