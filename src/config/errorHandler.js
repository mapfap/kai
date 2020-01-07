const router = require('express').Router()
const uuidv4 = require('uuid/v4')

router.use((err, req, res, next) => {
  const ref = uuidv4()
  err.ref = ref
  logger.error(err)
  res.status(500).json({ message: 'Something went wrong', ref: ref});
})

module.exports = router