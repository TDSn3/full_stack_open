const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user')

    response.json(blogs)
})

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    const { body } = request

    if (!body.userId) {
        return (response.status(400).json({ error: 'userId is required' }))
    }

    const userVerifUserId = await User.findById(body.userId)
    if (!userVerifUserId) {
        return (response.status(400).json({ error: 'userId invalid' }))
    }

    if (!request.user) {
        return (response.status(400).json({ error: 'user not found' }))
    }

    if (request.user.id !== body.userId) {
        return (response.status(401).json({ error: 'userId and token do not match' }))
    }

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: request.user.id,
    })

    const savedBlog = await newBlog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog.id)
    await request.user.save()

    return (response.status(201).json(savedBlog))
})

blogsRouter.put('/:id', async (request, response) => {
    const { body } = request

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true, runValidators: true, context: 'query' })
    response.json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return (response.status(400).json({ error: 'blog not found' }))
    }
    if (request.user.id !== blog.user.toString()) {
        return (response.status(401).json({ error: 'blog user and token do not match' }))
    }

    if (!request.user) {
        return (response.status(400).json({ error: 'user not found' }))
    }

    request.user.blogs = request.user.blogs.filter(
        (userValue) => userValue.toString() !== request.params.id,
    )
    await request.user.save()
    await Blog.findByIdAndDelete(request.params.id)

    return (response.status(204).end())
})

module.exports = blogsRouter
