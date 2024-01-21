
require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person.js')
const defaultPort = process.env.DEFAULT_PORT

const port = process.env.port || defaultPort

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

app.use(cors())
app.use(express.static('dist'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas", 
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace", 
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov", 
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck", 
        number: "39-23-6423122"
    }
]

const personsSize = () => {
    const size = persons.reduce( (accumulator) => {
        return (accumulator + 1)
    }, 0)
    
    return (size)
}

const generateId = () => {
    return (Math.floor(Math.random() * (1_000_000 * personsSize() ) ) )
}

/* ************************************************************************** */

morgan.token('body', (req, res) => {
    return (JSON.stringify(req.body))
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find((personValue) => (personValue.id === id))

    if (person)
        response.json(person)
    else
        response.status(404).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name)
    {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }
    else if (persons.find( (personValue) => (personValue.name === body.name) ) )
    {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    const personObject = {
        id: generateId(),
        name: body.name,
        number: String(body.number)
    }

    persons = persons.concat(personObject)

    response.json(personObject)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter((personValue) => (personValue.id !== id))

    response.status(204).end()
})
