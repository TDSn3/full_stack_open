const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Test',
        author: 'Thomas',
        url: 'test.com',
        likes: 1,
    },
    {
        title: 'Test2',
        author: 'Clement',
        url: 'test2.com',
        likes: 33,
    },
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'willremovethissoon',
        author: 'willremovethissoon',
        url: 'willremovethissoon',
        likes: 0,
    })

    await blog.save()
    await blog.deleteOne()

    return (blog._id.toString())
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return (blogs.map((blog) => blog.toJSON()))
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
}
