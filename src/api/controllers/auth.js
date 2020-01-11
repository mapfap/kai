const router = require('express').Router()
const jwt = require('jsonwebtoken')
const fs = require('fs')
const db = require('../../config/db')
const logger = require('../../config/logger')
const bcrypt = require('bcrypt')
const config = require('../../config/config')
const privateKey = config.jwt.privateKey

router.post('/register', (req, res, next) => {

  // TODO: Validate and sanitize and body
  bcrypt.hash(req.body.password, config.bcrypt.saltRounds).then(hashed => {
    db.createUser({
      username: req.body.username,
      password: hashed
    }).then(user =>
      res.json({ id: user.ops[0]._id })
    ).catch(err => next(err))
  }).catch(err => next(err))

})

router.post('/login', (req, res, next) => {

  db.getUserByUsername(req.body.username).then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then(isPasswordMatched => {
        sendTokenIfAuthenticated(res, user, isPasswordMatched)
      }).catch(err => next(err))
    } else {
      rejectRequest(res, `@${req.body.username} - User doesn't exists`)
    }
  }).catch(err => next(err))

})

const rejectRequest = (res, reason) => {
  logger.debug(reason)
  res.status(401).json({ message: 'Invalid username or password' })
}

const sendTokenIfAuthenticated = (res, user, isPasswordMatched) => {
  if (isPasswordMatched) {
    res.json({
      token: jwt.sign(
        { id: user._id },
        privateKey, { algorithm: config.jwt.algorithm, expiresIn: config.jwt.expiresIn }
      )
    })
  } else {
    rejectRequest(res, `@${user.username} - Invalid password`)
  }
}

module.exports = router