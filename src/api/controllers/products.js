const router = require('express').Router()
const { rules, validate } = require('../validators/id')

router.get('/', (req, res) => {
  return res.json([{name: 'iPad Pro 10.5"'}])
})

router.get('/:id', rules(), validate, (req, res) => {
  return res.json({ id: req.params.id })
})

module.exports = router