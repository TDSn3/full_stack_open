const cors = require('cors')
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express()
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.databaseUrl)

mongoose.connect(config.databaseUrl)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => (JSON.stringify(req.body)))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
