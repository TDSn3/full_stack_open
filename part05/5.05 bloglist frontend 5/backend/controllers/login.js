const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const middleware = require('../utils/middleware')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!user || !passwordCorrect) {
        return (response.status(401).json({
            error: 'invalid username or password',
        }))
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    // token expires after 1 day (60 * 60 * 24 = 86400 = 1 day)
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 })

    return (response
        .status(200)
        .send({
            token, username: user.username, name: user.name, userId: user.id,
        }))
})

loginRouter.get('/token', middleware.tokenExtractor, async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return (response.status(401).json({ error: 'token invalid' }))
        }
        return (response.status(200).json({ error: 'ok' }))
    } catch (e) {
        return response.status(401).json({ error: 'token invalid or expired' })
    }
})

module.exports = loginRouter
