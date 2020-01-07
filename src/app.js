require('dotenv').config()
require('./config/db')

const express = require('express')
const http = require('http')
const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const logger = require('./config/logger')
const routes = require('./config/routes')
const errorHandler = require('./config/errorHandler')

const app = express()

app.use(morgan('dev', { 'stream': logger.morganStream }))

app.disable('etag')
app.use(helmet())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compression())

// Define all routes here
app.use(routes)

// Express error handler
app.use(errorHandler)

const server = http.createServer(app)

server.listen(process.env.PORT || '3000', (s) => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  logger.info('Listening on ' + bind)
})