
require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person.js')
const defaultPort = process.env.DEFAULT_PORT
const port = process.env.port || defaultPort

/* ************************************************************************** */

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req, res) => {
    return (JSON.stringify(req.body))
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const personsSize = () => {
    const size = Person.reduce( (accumulator) => {
        return (accumulator + 1)
    }, 0)
    
    return (size)
}

/* ************************************************************************** */

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(personsResult =>
        {
            response.json(personsResult)
        })
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${personsSize()} people</p><p>${new Date()}</p>`
    )
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if (person)
            response.json(person)
        else
            response.status(404).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: String(body.number)
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name)
        return response.status(400).json({ error: 'name missing' })

    const newPerson = new Person({
        name: body.name,
        number: String(body.number)
    })
    
    newPerson.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
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
  
    next(error)
}

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
