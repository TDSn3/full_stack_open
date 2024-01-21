
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import PersonList from './components/PersonList.jsx';

const App = () =>
{

    const [persons, setPersons] = useState([])
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

            <Filter newFilter={newFilter} handlenewFilterChange={handlenewFilterChange} />

            <h2>Add a new</h2>

            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNewNameChange={handleNewNameChange}
                newPhoneNum={newPhoneNum}
                handlenewPhoneNumChange={handlenewPhoneNumChange} />

            <h2>Numbers</h2>

            <PersonList persons={persons} newFilter={newFilter} />
        </div>
    )
}

export default App
