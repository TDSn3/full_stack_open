
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import Person from './components/Person.jsx'


const App = () =>
{

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')

    const handleNewNameChange = (event) =>
    {
        setNewName(event.target.value)
    }

    const addPerson = (event) =>
    {
        event.preventDefault()

        const personObject = {
//          id:     persons.length + 1,
            id:     uuidv4(),
            name:   newName,
        }

        setPersons(persons.concat(personObject))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNewNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

            <h2>Numbers</h2>
            <ul>
                {persons.map(pt_person =>
                    <Person key={pt_person.id} src={pt_person} />
                )}
            </ul>
        </div>
    )
}

export default App
