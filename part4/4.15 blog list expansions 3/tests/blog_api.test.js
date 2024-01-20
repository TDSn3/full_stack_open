const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blog_test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let i = 0; i < helper.initialBlogs.length; i += 1) {
        const blogObject = new Blog(helper.initialBlogs[i])
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
        const blogs = await helper.blogsInDb()

        blogs.forEach((blog) => {
            expect(blog.id).toBeDefined()
            expect(blog._id).not.toBeDefined()
        })
    })

    describe('post request', () => {
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

        test('default blog likes value is zero', async () => {
            const newBlog = {
                title: 'Test3',
                author: 'Leona',
                url: 'test.com',
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

            const likes = blogsAtEnd.map((n) => n.likes)
            expect(likes[likes.length - 1]).toBe(0)
        })

        test('no url or no title dont creat a new blog', async () => {
            const newBlog1 = {
                author: 'Leona',
                url: 'test.com',
            }

            const newBlog2 = {
                title: 'Test3',
                url: 'test.com',
            }

            await api
                .post('/api/blogs')
                .send(newBlog1)
                .expect(400)

            await api
                .post('/api/blogs')
                .send(newBlog2)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })
    })

    describe('delete request', () => {
        test('a blog can be deleted', async () => {
            const newBlog = {
                title: 'TestDelete',
                author: 'Joaquim',
                url: 'test.com',
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)

            const blogsAtStart = await helper.blogsInDb()
            expect(blogsAtStart).toHaveLength(helper.initialBlogs.length + 1)

            await api
                .delete(`/api/blogs/${blogsAtStart[blogsAtStart.length - 1].id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

            const contents = blogsAtEnd.map((r) => r.title)
            expect(contents).not.toContain(newBlog.title)
        })
    })

    describe('put request', () => {
        test('a blog can be updated', async () => {
            const newBlog = {
                title: 'TestPut',
                author: 'UpdatedSoon',
                url: 'test.com',
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)

            const blogsAtStart = await helper.blogsInDb()
            expect(blogsAtStart).toHaveLength(helper.initialBlogs.length + 1)

            await api
                .put(`/api/blogs/${blogsAtStart[blogsAtStart.length - 1].id}`)
                .send({ likes: 100 })

            const blogsAtEnd = await helper.blogsInDb()
            const likes = blogsAtEnd.map((n) => n.likes)
            expect(likes[likes.length - 1]).toBe(100)
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
