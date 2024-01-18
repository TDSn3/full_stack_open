const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let i = 0; i < helper.initialBlogs.length; i += 1) {
        const blogObject = new Blog(helper.initialBlogs[i])
        await blogObject.save() // eslint-disable-line no-await-in-loop
    }
})

/* ************************************************************************** */

test('persons are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100_000)

test('persons has an id whithout underscore', async () => {
    const blogs = await helper.blogsInDb()

    blogs.forEach((blog) => {
        expect(blog.id).toBeDefined()
        expect(blog._id).not.toBeDefined()
    })
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Test3',
        author: 'Leona',
        url: 'test.com',
        likes: 10,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const authors = blogsAtEnd.map((n) => n.author)
    expect(authors).toContain('Leona')
})

afterAll(async () => {
    await mongoose.connection.close()
})
