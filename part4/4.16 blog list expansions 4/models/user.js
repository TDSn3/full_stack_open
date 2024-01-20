const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    passwordHash: {
        type: String,
    },
    name: {
        type: String,
    },
})

userShema.set('toJSON', {
    transform: (document, returnedObject) => {
        const modifiedObject = { ...returnedObject, id: returnedObject._id.toString() }
        delete modifiedObject._id
        delete modifiedObject.__v
        delete modifiedObject.passwordHash

        return (modifiedObject)
    },
})

userShema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userShema)
