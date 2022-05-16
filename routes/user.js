const express = require('express')

const router = express.Router()

const user = require('../controller/user')
const middleware = require('../helpers/middleware')

router.get('/', middleware, user.getUser)
router.delete('/', middleware, user.deleteAllUser)
router.post('/create-user', user.createUser)
router.post('/login', user.loginUser)
router.get('/verify', user.verifyUser)
router.get('/self', middleware, user.getUserOne)
router.get('/other', middleware, user.getOtherUser)
router.get('/get-by-token', middleware, user.getUserByToken)

module.exports = router
