const jwt = require('jsonwebtoken')
const fs = require('fs')
const privateKey = fs.readFileSync('kai')
const logger = require('../config/logger')

const authenticate = (req, res, next) => {
  try {
    // TODO: validate header + its existense
    const token = req.get('Authorization').replace(/Bearer\s/g, '')
    const decoded = jwt.verify(token, privateKey, { algorithms: ['HS512'] })
    req.userId = decoded.id
    return next()
  } catch(err) {
    return res.status(401).json(err.message)
  }
}

module.exports = {
  authenticate
}