const _ = require('lodash') // eslint-disable-line import/no-extraneous-dependencies

const dummy = (blogs) => (1) // eslint-disable-line no-unused-vars

const totalLikes = (blogs) => {
    const reducer = (sum, item) => (sum + item.likes)

    return (blogs.reduce(reducer, 0))
}

const favoriteBlog = (blogs) => {
    const blogIndex = {
        title: '',
        author: '',
        likes: -1,
    }

    const reducer = (sum, item) => (item.likes > sum.likes ? { ...item } : sum)

    return (blogs.reduce(reducer, blogIndex))
}

const mostBlogs = (blogs) => {
    const authorShema = {
        author: '',
        blogs: -1,
    }

    const authorBlogCount = blogs
        .reduce((sum, item) => {
            sum[item.author] = sum[item.author] + 1 || 1 // eslint-disable-line no-param-reassign
            return (sum)
        }, {})

    const author = Object.entries(authorBlogCount)
        .reduce((sum, item) => (
            item[1] > sum.blogs ? { author: item[0], blogs: item[1] } : sum
        ), authorShema)

    return (author)
}

// With Lodash library
const mostBlogsLodash = (blogs) => {
    const authorBlogCount = _.countBy(blogs, 'author')
    const authorWithMostBlogs = _.maxBy(_.toPairs(authorBlogCount), 1)

    return ({ author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1] })
}

const mostLikes = (blogs) => {
    const authorShema = {
        author: '',
        likes: -1,
    }

    const authorBlogCount = blogs
        .reduce((sum, item) => {
            const authorIndex = sum.findIndex((element) => element.author === item.author)

            if (authorIndex !== -1) {
                sum[authorIndex].likes += item.likes // eslint-disable-line no-param-reassign
            } else {
                sum.push({ author: item.author, likes: item.likes })
            }
            return (sum)
        }, [])

    const author = authorBlogCount
        .reduce((sum, item) => (
            item.likes > sum.likes ? item : sum
        ), authorShema)

    return (author)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostBlogsLodash,
    mostLikes,
}
