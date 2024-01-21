
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import Person from './components/Person.jsx'


const App = () =>
{

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhoneNum, setNewPhoneNum] = useState('')

    const handleNewNameChange = (event) =>
    {
        setNewName(event.target.value)
    }

    const handlenewPhoneNumChange = (event) =>
    {
        setNewPhoneNum(event.target.value)
    }

    const addPerson = (event) =>
    {
        event.preventDefault()

        if (persons.some( (it) => (it.name === newName) ) === true)
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
                    <Person key={pt_person.id} src={pt_person} />
                )}
            </ul>
        </div>
    )
}

export default App
