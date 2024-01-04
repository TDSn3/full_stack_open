
const PersonForm = ({ addPerson, newName, handleNewNameChange, newPhoneNum, handlenewPhoneNumChange }) =>
{	
	return (
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
	)
}

export default PersonForm
