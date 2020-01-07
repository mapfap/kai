const { param, validationResult } = require('express-validator')

const rules = () => {
  return [
    param('id').exists().isInt({ min: 1, max: 9007199254740991 }).toInt()
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  return res.status(400).json(errors.errors.map( e => `${e.param}: ${e.msg}`))
}

module.exports = {
  rules,
  validate,
}