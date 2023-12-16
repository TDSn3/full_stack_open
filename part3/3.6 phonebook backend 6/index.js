
const express = require('express')
const app = express()

const PORT = 3001

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

app.use(express.json())

app.get('/api/persons', (request, response) => {
    response.json(persons)
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
