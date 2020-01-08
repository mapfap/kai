const mongo = require('mongodb')
const MongoClient = mongo.MongoClient

const uri = process.env.MONGO
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 1000
})

let currentDb

module.exports.connect = () => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) reject(err)
      currentDb = client.db('kai')
      resolve('Connected to MongoDB')
    })
  })
}

const find = (collection, query) => {
  return new Promise((resolve, reject) => {
    currentDb.collection(collection).find(query).toArray((err, docs) => {
      err ? reject(err) : resolve(docs)
    })
  })
}

const findOne = (collection, query) =>  {
  return new Promise((resolve, reject) => {
    find(collection, query).then(
      docs => resolve(docs[0])
    ).catch(
      err => reject(err)
    )
  })
}

module.exports.getProducts = () => find('products', {})
module.exports.getUsers = () => find('users', {})

module.exports.getUserById = (id) => findOne('users', { _id: mongo.ObjectID(id) })

module.exports.getUserByUsername = (username) => findOne('users', { username: username })

module.exports.updateUser = (id, user) => {
  return new Promise((resolve, reject) => {
    currentDb.collection('users').updateOne({ id : id }, { $set: user }, (err, docs) => {
      err ? reject(err) : resolve(docs)
    })
  })
}

module.exports.createUser = (user) => {
  return new Promise((resolve, reject) => {
    currentDb.collection('users').insertMany([user], (err, docs) => {
      err ? reject(err) : resolve(docs)
    })
  })
}

module.exports.getDb = () => currentDb
