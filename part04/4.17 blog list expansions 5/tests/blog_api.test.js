const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helperBlog = require('./blog_test_helper')
const helperUser = require('./user_test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let i = 0; i < helperBlog.initialBlogs.length; i += 1) {
        const blogObject = new Blog(helperBlog.initialBlogs[i])
        await blogObject.save() // eslint-disable-line no-await-in-loop
    }
})

/* ************************************************************************** */

describe('Blog tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100_000)

    test('blogs has an id whithout underscore', async () => {
        const blogs = await helperBlog.blogsInDb()

        blogs.forEach((blog) => {
            expect(blog.id).toBeDefined()
            expect(blog._id).not.toBeDefined()
        })
    })

    describe('post request', () => {
        test('a valid blog can be added', async () => {
            const users = await helperUser.usersInDb()

            const newBlog = {
                title: 'Test3',
                author: 'Leona',
                url: 'test.com',
                likes: 10,
                userId: users[0].id,
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helperBlog.blogsInDb()

            expect(blogsAtEnd).toHaveLength(helperBlog.initialBlogs.length + 1)

            const authors = blogsAtEnd.map((n) => n.author)
            expect(authors).toContain('Leona')
        })

        test('default blog likes value is zero', async () => {
            const users = await helperUser.usersInDb()

            const newBlog = {
                title: 'Test3',
                author: 'Leona',
                url: 'test.com',
                userId: users[0].id,
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helperBlog.blogsInDb()

            expect(blogsAtEnd).toHaveLength(helperBlog.initialBlogs.length + 1)

            const likes = blogsAtEnd.map((n) => n.likes)
            expect(likes[likes.length - 1]).toBe(0)
        })

        test('no url or no title dont creat a new blog', async () => {
            const users = await helperUser.usersInDb()

            const newBlog1 = {
                author: 'Leona',
                url: 'test.com',
                userId: users[0].id,
            }

            const newBlog2 = {
                title: 'Test3',
                url: 'test.com',
                userId: users[0].id,
            }

            await api
                .post('/api/blogs')
                .send(newBlog1)
                .expect(400)

            await api
                .post('/api/blogs')
                .send(newBlog2)
                .expect(400)

            const blogsAtEnd = await helperBlog.blogsInDb()

            expect(blogsAtEnd).toHaveLength(helperBlog.initialBlogs.length)
        })
    })

    describe('delete request', () => {
        test('a blog can be deleted', async () => {
            const users = await helperUser.usersInDb()

            const newBlog = {
                title: 'TestDelete',
                author: 'Joaquim',
                url: 'test.com',
                userId: users[0].id,
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)

            const blogsAtStart = await helperBlog.blogsInDb()
            expect(blogsAtStart).toHaveLength(helperBlog.initialBlogs.length + 1)

            await api
                .delete(`/api/blogs/${blogsAtStart[blogsAtStart.length - 1].id}`)
                .expect(204)

            const blogsAtEnd = await helperBlog.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helperBlog.initialBlogs.length)

            const contents = blogsAtEnd.map((r) => r.title)
            expect(contents).not.toContain(newBlog.title)
        })
    })

    describe('put request', () => {
        test('a blog can be updated', async () => {
            const users = await helperUser.usersInDb()

            const newBlog = {
                title: 'TestPut',
                author: 'UpdatedSoon',
                url: 'test.com',
                userId: users[0].id,
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)

            const blogsAtStart = await helperBlog.blogsInDb()
            expect(blogsAtStart).toHaveLength(helperBlog.initialBlogs.length + 1)

            await api
                .put(`/api/blogs/${blogsAtStart[blogsAtStart.length - 1].id}`)
                .send({ likes: 100 })

            const blogsAtEnd = await helperBlog.blogsInDb()
            const likes = blogsAtEnd.map((n) => n.likes)
            expect(likes[likes.length - 1]).toBe(100)
        })
    })
})
afterAll(async () => {
    await mongoose.connection.close()
})
