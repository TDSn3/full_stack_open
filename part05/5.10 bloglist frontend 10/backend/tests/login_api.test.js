/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helperUser = require('./user_test_helper')

const api = supertest(app)

/* ************************************************************************** */

describe('Login tests', () => {
    test('login is successful', async () => {
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
