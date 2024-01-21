const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user')

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const { body } = request
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return (response.status(401).json({ error: 'token invalid' }))
    }
    if (!body.userId) {
        return (response.status(400).json({ error: 'userId is required' }))
    }

    const userVerifUserId = await User.findById(body.userId)
    if (!userVerifUserId) {
        return (response.status(400).json({ error: 'userId invalid' }))
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
        return (response.status(400).json({ error: 'user not found' }))
    }

    if (decodedToken.id !== body.userId) {
        return (response.status(401).json({ error: 'userId and token do not match' }))
    }

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id,
    })

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    return (response.status(201).json(savedBlog))
})

blogsRouter.put('/:id', async (request, response) => {
    const { body } = request

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true, runValidators: true, context: 'query' })
    response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return (response.status(400).json({ error: 'blog not found' }))
    }
    const user = await User.findById(blog.user)

    if (!user) {
        return (response.status(400).json({ error: 'user not found' }))
    }

    user.blogs = user.blogs.filter((userValue) => userValue.toString() !== request.params.id)
    await user.save()
    await Blog.findByIdAndDelete(request.params.id)

    return (response.status(204).end())
})

module.exports = blogsRouter
