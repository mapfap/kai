const router = require('express').Router()

router.get('/', (req, res) => res.json({ up: true, version: 0 }))

module.exports = router