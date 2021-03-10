const express = require('express')
const http = require('http')
const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { v4: uuidv4 } = require('uuid')

require('dotenv').config()
const config = require('./config/config')
const logger = require('./config/logger')
const routes = require('./config/routes')

const app = express()

app.use(morgan('dev', { stream: logger.morganStream }))

app.disable('etag')
app.disable('x-powered-by')
app.use(helmet())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compression())

// Define all routes here
app.use(routes)

// Express error handler
app.use((err, req, res) => {
  const ref = uuidv4()
  err.ref = ref
  logger.error(err)
  res.status(500).json({ message: 'Something went wrong', ref: ref })
})

const server = http.createServer(app)

//db.connect().then(result => {
//  logger.info(result)
  server.listen(config.express.port, () => {
    const address = server.address()
    logger.info(`Listening on ${address.address}${address.port}`)
  })
//}).catch(err => {
  //logger.error('Unable to connect to database, terminating the service..')
  //logger.error(err)
  //process.exit(-1)
//})
