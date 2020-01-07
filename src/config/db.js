const mongo = require('mongodb');
const MongoClient = mongo.MongoClient

const uri = process.env.MONGO
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
let isConnected = false

client.connect(err => {
  if (err) { 
    console.log(err)
    process.exit(-1)
  }

  isConnected = true
  console.log(`[sys] Connected to MongoDB`)
})

const getUsersPromise = () => {
  return new Promise((resolve, reject) => {
    client.db("kai").collection("users").find({}).toArray(function(err, docs) {
      err ? reject(err) : resolve(docs)
    })
  })
}

const getUserByIdPromise = (id) => {
  return new Promise((resolve, reject) => {
    client.db("kai").collection("users").find({_id: id}).toArray(function(err, docs) {
      err ? reject(err) : resolve(docs)
    })
  })
}

const getUserByUsernamePromise = (username) => {
  return new Promise((resolve, reject) => {
    client.db("kai").collection("users").find({username: username}).toArray(function(err, docs) {
      err ? reject(err) : resolve(docs)
    })
  })
}

const createUserPromise = (user) => {
  return new Promise((resolve, reject) => {
    client.db("kai").collection("users").insertMany([user], function(err, docs) {
      err ? reject(err) : resolve(docs)
    })
  })
}

const updateUserPromise = (id, user) => {
  return new Promise((resolve, reject) => {
    client.db("test").collection("users")
    .updateOne({ id : id }, { $set: user }, function(err, docs) {
      err ? reject(err) : resolve(docs)
    })
  })
}

const getUsers = async () => {
  assertDBConnection()
  return await getUsersPromise()
}

const getUserById = async (id) => {
  id = new mongo.ObjectID(id);
  assertDBConnection()
  return await getUserByIdPromise(id)
}

const getUserByUsername = async (username) => {
  assertDBConnection()
  return await getUserByUsernamePromise(username)
}

const updateUser = async () => {
  assertDBConnection()
  return await updateUserPromise()
}

const createUser = async (user) => {
  assertDBConnection()
  return await createUserPromise(user)
}

const assertDBConnection = () => {
  if (!isConnected) throw new Error('DB is net connected')
}

module.exports = { getUsers, getUserById, getUserByUsername, createUser, updateUser }