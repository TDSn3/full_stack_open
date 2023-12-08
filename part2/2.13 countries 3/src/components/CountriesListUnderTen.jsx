
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Countrie from './Countrie.jsx'
import Button from './Button.jsx'
import FullCountrie from './FullCountrie.jsx'

const CountriesListUnderTen = ({ filteredCountries }) => {	

	const [countrieDetails, setCountrieDetails] = useState(null)

	const handleClick = (value) => {
		console.log(value)
		setCountrieDetails(<FullCountrie key={uuidv4()} data={value} />)
	}

	return (
		<>
			{filteredCountries.map( (value) => {
					return (
						<p key={uuidv4()}>
							<Countrie data={value} />
							<Button handleClick={() => handleClick(value)} text={'show'} />
						</p>
					)
				})
			}
			{countrieDetails}
		</>
	)
}

export default CountriesListUnderTen
