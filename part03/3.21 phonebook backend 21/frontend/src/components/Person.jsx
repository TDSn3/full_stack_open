
import Button from './Button.jsx'

const Person = ({ src, deletePerson, id }) =>
{	
	return (
		<p>
			<span style={{fontWeight: 'bold'}}>{src.name} </span><span>{src.number} </span>
			<Button handleClick={() => deletePerson(id)} text='Delete'/>
		</p>
	)
}

export default Person
