
const Search = ({ search, handleSearchChange }) => {	

	return (
		<>
			Find countries <input value={search} onChange={handleSearchChange} />
		</>
	)
}

export default Search
