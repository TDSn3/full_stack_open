const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
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
