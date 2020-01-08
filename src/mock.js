require('dotenv').config()
const db = require('./config/db')

db.connect().then(result => {
  console.log(result)
  const currentDb = db.getDb()

  currentDb.collection('products').deleteMany({}, (err, docs) => {
    if (err) {
      console.error(err)
    } else {
      console.log({ deletedCount: docs.deletedCount })
    }
  })

  currentDb.collection('products').insertMany([
    { name: 'iPad Pro 10.5', price: 24000 },
    { name: 'iPhone 11 Pro', price: 35900 },
    { name: 'Macbook', price: 59000 },
    { name: 'Beats Pro', price: 7900 }
  ], (err, docs) => {
    if (err) {
      console.error(err)
    } else {
      console.log({ insertedCount: docs.insertedCount })
    }
  })
}).catch(err => {
  console.error('Unable to connect to database, terminating the service..')
  console.error(err)
  process.exit(-1)
})
