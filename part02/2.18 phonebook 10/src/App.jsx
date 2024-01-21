
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import PersonList from './components/PersonList.jsx'

import personService from './services/person.jsx';

const App = () =>
{

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhoneNum, setNewPhoneNum] = useState('')
    const [newFilter, setNewFiltereNum] = useState('')

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

        if (persons.some( (value) => {
            stock_id = value.id

                return (value.name === newName)
            }) === true)
        {
            if (confirm(`${persons.find( (value) => (value.id === stock_id ) ).name} is alredy added to phonebook, replace the old number with the new one?`))
            {
                personService
                    .update(stock_id, personObject)
                    .then( (updatedPerson) => {
                        setPersons(persons.map( (personValue) => (personValue.id !== stock_id ? personValue : updatedPerson) ))
                        setNewName('')
                        setNewPhoneNum('')
                    })
                    .catch( () => {
                        alert(`${personObject.name} was already deleted from server`)
                        setPersons(persons.filter( (value) => (value.id !== stock_id) ))
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
