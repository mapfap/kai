const router = require('express').Router()
const jwt = require('jsonwebtoken')
const fs = require('fs')
const privateKey = fs.readFileSync(process.env.KEY_PATH)
const db = require('../../config/db')
const logger = require('../../config/logger')

router.post('/register', async (req, res, next) => {
  // TODO: Validate body
  db.createUser({
    username: req.body.username,
    password: req.body.password
  }).then(user =>
    res.json({ id: user.ops[0]._id })
  ).catch(err => next(err))
})

router.post('/login', async (req, res, next) => {
  db.getUserByUsername(req.body.username).then(user => {

    if (user && user.password == req.body.password) {
      return res.json({
        token: jwt.sign(
          { id: user._id },
          privateKey, { algorithm: 'HS512', expiresIn: '7d' }
        )
      })
    }

    if (user) {
      logger.debug(`@${req.body.username} - Invalid password`)
    } else {
      logger.debug(`@${req.body.username} - User doesn't exists`)
    }

    res.status(401).json({ message: 'Invalid username or password' })
  }).catch(err => next(err))
})

module.exports = router