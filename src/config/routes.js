const router = require('express').Router()

const authenticator = require('../api/authenticator')
const indexRouter = require('../api/controllers/index')
const authApiRouter = require('../api/controllers/auth')
const userApiRouter = require('../api/controllers/users')
const productApiRouter = require('../api/controllers/products')

// Unauthenticated Routes
router.use('/', indexRouter)
router.use('/api/auth', authApiRouter)

// Authenticated Routes
router.use('/api/users', authenticator.authenticate, userApiRouter)
router.use('/api/products', authenticator.authenticate, productApiRouter)

module.exports = router
