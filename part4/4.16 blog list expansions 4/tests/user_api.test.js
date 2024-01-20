const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./user_test_helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    for (let i = 0; i < helper.initialUsers.length; i += 1) {
        const userObject = new User(helper.initialUsers[i])
        await userObject.save() // eslint-disable-line no-await-in-loop
    }
})

/* ************************************************************************** */

describe('User tests', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100_000)

    test('users has an id whithout underscore', async () => {
        const users = await helper.usersInDb()

        users.forEach((user) => {
            expect(user.id).toBeDefined()
            expect(user._id).not.toBeDefined()
        })
    })

    describe('post request', () => {
        test('a valid user can be added', async () => {
            const newUser = {
                username: 'three',
                password: '1234',
                name: 'test3',
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()

            expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

            const usernames = usersAtEnd.map((n) => n.username)
            expect(usernames).toContain('three')
        })

        test('invalid user password is rejected', async () => {
            const newUser = {
                username: 'four',
                password: '12',
                name: 'test4',
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })

        test('invalid user username is rejected', async () => {
            const newUser = {
                username: '12',
                password: '1234',
                name: 'test4',
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
