const jwt = require('jsonwebtoken')
const logger = require('../config/logger')
const config = require('../config/config')
const privateKey = config.jwt.privateKey

const authenticate = (req, res, next) => {
  try {
    // TODO: validate header + its existense
    const token = req.get('Authorization').replace(/Bearer\s/g, '')
    const decoded = jwt.verify(token, privateKey, { algorithms: [config.jwt.algorithm] })
    req.userId = decoded.id
    next()
  } catch(err) {
    res.status(401).json({ message: err.message })
  }
}

module.exports = {
  authenticate
}