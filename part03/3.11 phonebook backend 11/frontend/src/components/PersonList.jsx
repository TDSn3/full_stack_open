
import Person from './Person.jsx'

const PersonList = ({ persons, newFilter, deletePerson }) =>
{	
	return (
		<>
			{persons.map(pt_person =>
				{
					if (pt_person.name.toLowerCase().includes(newFilter.toLowerCase()) === true)
						return ( <Person key={pt_person.id} src={pt_person} deletePerson={deletePerson} id={pt_person.id} /> )
					else
						return
				}
			)}
		</>
	)
}

export default PersonList
