const router = require('express').Router()
const { rules, validate } = require('../validators/id')
const db = require('../../config/db')

router.get('/', (req, res) => {
  db.getProducts().then(products => res.json(products)).catch(err => next(err))
})

router.get('/:id', rules(), validate, (req, res) => {
  res.json({ id: req.params.id })
})

module.exports = router