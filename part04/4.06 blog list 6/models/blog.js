const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        const modifiedObject = { ...returnedObject, id: returnedObject._id.toString() }
        delete modifiedObject._id
        delete modifiedObject.__v
        return (modifiedObject)
    },
})

module.exports = mongoose.model('Blog', blogSchema)
