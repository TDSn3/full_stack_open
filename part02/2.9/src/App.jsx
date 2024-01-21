
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import Person from './components/Person.jsx'


const App = () =>
{

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas',      number:     '040-123456',       id: 1 },
        { name: 'Ada Lovelace',     number:     '39-44-5323523',    id: 2 },
        { name: 'Dan Abramov',      number:     '12-43-234345',     id: 3 },
        { name: 'Mary Poppendieck', number:     '39-23-6423122',    id: 4 },
        { name: 'aRTO Hellas',      number:     '040-123456',       id: 5 }
    ])
    const [newName, setNewName] = useState('')
    const [newPhoneNum, setNewPhoneNum] = useState('')
    const [newFilter, setNewFiltereNum] = useState('')

    const handleNewNameChange = (event) =>      setNewName(event.target.value)
    const handlenewPhoneNumChange = (event) =>  setNewPhoneNum(event.target.value)
    const handlenewFilterChange = (event) =>    setNewFiltereNum(event.target.value)

    const addPerson = (event) =>
    {
        event.preventDefault()

        if (persons.some( (value) => (value.name === newName) ) === true)
        {
            alert(newName + ' is already added to phonebook')
            return
        }

        const personObject = {
            id:             uuidv4(),
            name:           newName,
            phone_number:   newPhoneNum,
        }

        setPersons(persons.concat(personObject))
        setNewName('')
        setNewPhoneNum('')
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <div>
                filter show with <input value={newFilter} onChange={handlenewFilterChange} />
            </div>

            <h2>Add a new</h2>

            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNewNameChange} />
                </div>
                <div>
                    Phone number: <input value={newPhoneNum} onChange={handlenewPhoneNumChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

            <h2>Numbers</h2>
            <ul>
                {persons.map(pt_person =>
                    {
                        if (pt_person.name.toLowerCase().includes(newFilter.toLowerCase()) === true)
                            return ( <Person key={pt_person.id} src={pt_person} /> )
                        else
                            return
                    }
                )}
            </ul>
        </div>
    )
}

export default App
