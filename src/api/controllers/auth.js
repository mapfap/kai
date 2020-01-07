const router = require('express').Router()
const jwt = require('jsonwebtoken')
const fs = require('fs')
const privateKey = fs.readFileSync('kai')
const db = require('../../config/db')

router.post('/register', async (req, res) => {
  // TODO: Validate body
  // TODO: Improve db
  const user = await db.createUser({
    username: req.body.username,
    password: req.body.password
  })
  res.json(user.ops[0]._id)
})

router.post('/login', async (req, res) => {
  const users = await db.getUserByUsername(req.body.username)

  if (users.length > 0 && users[0].password == req.body.password) {
    return res.json(
      jwt.sign(
        { id: users[0]._id },
        privateKey, { algorithm: 'HS512', expiresIn: '7d' }
      )
    )
  } else {
    return res.status(401).json('Invalid username or password')
  }
})

module.exports = router