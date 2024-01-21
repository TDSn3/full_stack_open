require('dotenv').config()

const mongoose = require('mongoose')

const url = `mongodb+srv://${process.env.RENDER_USERNAME}:${process.env.RENDER_PASSWORD}@cluster0.eqahmbr.mongodb.net/${process.env.RENDER_DATABASE_NAME}?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

console.log('connecting to ', url)

mongoose.connect(url)
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
})

function validateNumber(number)
{
    const numberRegex = /^\d{2,3}-\d+$/

    if (!numberRegex.test(number))
        return (false)

    return (true)
}

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    number: {
        type: String,
        required: true,
        minlength: 8,
        validate : {
            validator: validateNumber,
            message: props => `${props.value} is not a valid number!`
        }
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
