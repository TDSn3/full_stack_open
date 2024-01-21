
import { v4 as uuidv4 } from 'uuid'

import Countrie from './Countrie.jsx'
import FullCountrie from './FullCountrie.jsx'

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
		return (
			<ul>
				{filteredCountries.map( (value) => {
						return (<Countrie key={uuidv4()} data={value} />)
					})
				}
			</ul>
		)
	}
	else if (filteredCountriesSize === 1) {
		return (
			<>
				<FullCountrie key={uuidv4()} data={filteredCountries[0]} />
			</>
		)
	}
}

export default CountriesList
