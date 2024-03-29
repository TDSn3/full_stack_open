const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    } else {
        request.token = null
    }

    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return (response.status(401).json({ error: 'token invalid' }))
    }

    const user = await User.findById(decodedToken.id)

    if (user) {
        request.user = user
    } else {
        request.user = null
    }

    next()
    return (null)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return (response.status(400).send({ error: 'malformatted id' }))
    }
    if (error.name === 'ValidationError') {
        return (response.status(400).json({ error: error.message }))
    }
    if (error.name === 'JsonWebTokenError') {
        return (response.status(401).json({ error: 'invalid token' }))
    }
    if (error.name === 'TokenExpiredError') {
        return (response.status(401).json({ error: 'token expired' }))
    }

    next(error)
    return (null)
}

module.exports = {
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler,
}
