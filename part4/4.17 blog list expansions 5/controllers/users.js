const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', {
            title: 1,
            author: 1,
            url: 1,
            id: 1,
        })

    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, password, name } = request.body

    if (!password || password.length < 3) {
        response.status(400).json({
            error: 'password is required and must be at least 3 characters long',
        })
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            username,
            passwordHash,
            name,
        })

        const savedUser = await newUser.save()

        response.status(201).json(savedUser)
    }
})

module.exports = usersRouter
