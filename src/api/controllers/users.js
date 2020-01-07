const router = require('express').Router()
const db = require('../../config/db')

router.get('/current', async (req, res) => {
  // TODO: return 1 item
  const users = await db.getUserById(req.userId)
  console.log(users[0].username)
  return res.json({
    username: users[0].username
  })
})

module.exports = router