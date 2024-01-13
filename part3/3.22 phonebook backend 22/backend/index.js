require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
const defaultPort = process.env.DEFAULT_PORT
const port = process.env.port || defaultPort

/* ************************************************************************** */

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => (JSON.stringify(req.body)))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const personsSize = async () => {
    const size = await Person.countDocuments()
    return (size)
}

/* ************************************************************************** */

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then((personsResult) => { response.json(personsResult) })
})

app.get('/info', (request, response, next) => {
    personsSize()
        .then((size) => {
            response
                .send(`<p>Phonebook has info for ${size} people</p><p>${new Date()}</p>`)
        })
        .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
        .then((updatedPerson) => {
            response.json(updatedPerson)
        })
        .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const { body } = request

    const newPerson = new Person({
        name: body.name,
        number: String(body.number),
    })

    newPerson.save()
        .then((savedPerson) => {
            response.json(savedPerson)
        })
        .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch((error) => next(error))
})

/* ************************************************************************** */

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
    return (null)
}

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
