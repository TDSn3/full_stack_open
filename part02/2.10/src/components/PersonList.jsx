
import Person from './Person.jsx'

const PersonList = ({ persons, newFilter }) =>
{	
	return (
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
	)
}

export default PersonList
