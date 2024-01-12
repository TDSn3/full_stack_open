
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import PersonList from './components/PersonList.jsx'
import Notification from './components/Notification.jsx'
import personService from './services/person.jsx';

const App = () =>
{

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhoneNum, setNewPhoneNum] = useState('')
    const [newFilter, setNewFiltereNum] = useState('')
    const [message, setMessage] = useState(null)
    const [messageClassName, setMessageClassName] = useState(null)

    const handleNewNameChange = (event) =>      setNewName(event.target.value)
    const handlenewPhoneNumChange = (event) =>  setNewPhoneNum(event.target.value)
    const handlenewFilterChange = (event) =>    setNewFiltereNum(event.target.value)

    const hook = () =>
    {
        console.log('hook()')

        personService
            .getAll()
            .then( (initialPersons) => {
                setPersons(persons.concat(initialPersons))
            })
    }

    useEffect(hook, [])

    const addPerson = (event) =>
    {
        event.preventDefault()

        let stock_id

        const personObject = {
            name:   newName,
            number: newPhoneNum,
        }

        const existingPerson = persons.some( (value) => {
                stock_id = value.id

                return (value.name === newName)
            })

        if (existingPerson === true)
        {
            if (confirm(`${persons.find( (value) => (value.id === stock_id ) ).name} is alredy added to phonebook, replace the old number with the new one?`))
            {
                personService
                    .update(stock_id, personObject)
                    .then( (updatedPerson) => {
                        setPersons(persons.map( (personValue) => (personValue.id !== stock_id ? personValue : updatedPerson) ))
                        setNewName('')
                        setNewPhoneNum('')

                        setMessage(`Number of ${updatedPerson.name} has changed to ${updatedPerson.number}`)
                        setMessageClassName('validation')
                        setTimeout( () => {
                            setMessage(null)
                            setMessageClassName(null)
                        }, 5000)
                    })
                    .catch( () => {
                        setPersons(persons.filter( (value) => (value.id !== stock_id) ))

                        setMessage(`Information of ${personObject.name} has alredy been removed from server`)
                        setMessageClassName('error')
                        setTimeout( () => {
                            setMessage(null)
                            setMessageClassName(null)
                        }, 5000)
                    })
            }
            
            return
        }

        personService
            .create(personObject)
            .then( (newPerson) => {
                setPersons(persons.concat(newPerson))
                setNewName('')
                setNewPhoneNum('')

                setMessage(`Added ${newPerson.name}`)
                setMessageClassName('validation')
                setTimeout( () => {
                    setMessage(null)
                    setMessageClassName(null)
                }, 5000)
            })
    }

    const deletePerson = (id) => {
        console.log(id)

        if (confirm(`Delete ${persons.find( (value) => (value.id === id ) ).name} ?`))
        {
            personService
                .deleteOne(id)
                .then ( () => {
                    setPersons(persons.filter( (value) => (value.id !== id) ))
                })
                .catch ( () => {
                    console.log('Fail DELETE request')

                    setPersons(persons.filter( (value) => (value.id !== id) ))
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={message} messageClassName={messageClassName} />

            <Filter newFilter={newFilter} handlenewFilterChange={handlenewFilterChange} />

            <h2>Add a new</h2>

            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNewNameChange={handleNewNameChange}
                newPhoneNum={newPhoneNum}
                handlenewPhoneNumChange={handlenewPhoneNumChange} />

            <h2>Numbers</h2>

            <PersonList persons={persons} newFilter={newFilter} deletePerson={deletePerson} />
        </div>
    )
}

export default App
