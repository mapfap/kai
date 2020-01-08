const router = require('express').Router()
const db = require('../../config/db')

router.get('/current', (req, res, next) => {
  db.getUserById(req.userId).then(user => {
  	if (user) return res.json({ username: user.username })
	  res.status(400).json({ message: 'Your user account has been deleted' })
	})
	.catch(err => {
		next(err)
	})
})

module.exports = router