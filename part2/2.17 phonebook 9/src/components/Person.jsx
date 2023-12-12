
import Button from './Button.jsx'

const Person = ({ src, deletePerson, id }) =>
{	
	return (
		<p>
			<span>{src.name} {src.phone_number}</span>
			<Button handleClick={() => deletePerson(id)} text='Delete'/>
		</p>
	)
}

export default Person
