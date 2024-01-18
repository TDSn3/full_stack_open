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

test('all persons are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific note is within the returned persons', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map((r) => r.title)
    expect(contents).toContain(
        'Test',
    )
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

test('blog without title is not added', async () => {
    const newBlog = {}

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

// test('a specific blog can be viewed', async () => {
//     const blogsAtStart = await helper.blogsInDb()

//     const blogToView = blogsAtStart[0]

//     const resultBlog = await api
//         .get(`/api/blogs/${blogToView.id}`)
//         .expect(200)
//         .expect('Content-Type', /application\/json/)

//     expect(resultBlog.body).toEqual(blogToView)
// })

// test('a blog can be deleted', async () => {
//     const blogsAtStart = await helper.blogsInDb()
//     const blogToDelete = blogsAtStart[0]

//     await api
//         .delete(`/api/blogs/${blogToDelete.id}`)
//         .expect(204)

//     const blogsAtEnd = await helper.blogsInDb()

//     expect(blogsAtEnd).toHaveLength(
//         helper.initialBlogs.length - 1,
//     )

//     const contents = blogsAtEnd.map((r) => r.title)

//     expect(contents).not.toContain(blogToDelete.title)
// })

afterAll(async () => {
    await mongoose.connection.close()
})
