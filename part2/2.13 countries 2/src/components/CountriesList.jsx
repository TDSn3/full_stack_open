
import { v4 as uuidv4 } from 'uuid'

import FullCountrie from './FullCountrie.jsx'
import CountriesListUnderTen from './CountriesListUnderTen.jsx'

const CountriesList = ({ countriesListData, search }) => {

	const filteredCountries = countriesListData.filter( (value) => {
			return (search !== '' && value.name.common.toLowerCase().includes(search.toLowerCase()))
		})

	console.log(filteredCountries)

	const filteredCountriesSize = filteredCountries.reduce( (accumulator) => {
			return (accumulator + 1)
		}, 0)

	if (filteredCountriesSize > 10) {
		return (<p>Too many matches, specify another filter</p>)
	}
	else if (filteredCountriesSize > 1) {
		return (<CountriesListUnderTen filteredCountries={filteredCountries} />)
	}
	else if (filteredCountriesSize === 1) {
		return (<FullCountrie key={uuidv4()} data={filteredCountries[0]} />)
	}
}

export default CountriesList
