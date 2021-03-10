const router = require('express').Router()

const authenticator = require('../api/middlewares/authenticator')
const indexRouter = require('../api/controllers/index')
const authApiRouter = require('../api/controllers/auth')

// Unauthenticated Routes
router.use('/', indexRouter)
router.use('/api/auth', authApiRouter)

module.exports = router
