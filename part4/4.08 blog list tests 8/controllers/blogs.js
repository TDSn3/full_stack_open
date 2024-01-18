const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Use async/await instead of promises
//
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
})

// Use promises instead of async/await
//
// blogsRouter.get('/', (request, response) => {
//     Blog
//         .find({})
//         .then((blogs) => { response.json(blogs) })
// })

// Use async/await instead of promises
//
blogsRouter.post('/', async (request, response) => {
    const { body } = request

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
})

// Use promises instead of async/await
//
// blogsRouter.post('/', (request, response, next) => {
//     const { body } = request
//
//     const newBlog = new Blog({
//         title: body.title,
//         author: body.author,
//         url: body.url,
//         likes: body.likes,
//     })
//
//     newBlog
//         .save()
//         .then((savedBlog) => {
//             response.status(201).json(savedBlog)
//         })
//         .catch((error) => next(error))
// })

module.exports = blogsRouter
