const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const { body } = request

    if (!body.userId) {
        return (response.status(400).json({
            error: 'userId is required',
        }))
    }

    const user = await User.findById(body.userId)

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
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter
