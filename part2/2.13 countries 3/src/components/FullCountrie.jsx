
import { v4 as uuidv4 } from 'uuid'

import Flag from './Flag.jsx'

const FullCountrie = ({ data }) => {	

	return (
		<>
			<h1>{data.name.common}</h1>

			<p>Capital {data.capital}</p>
			<p>Area {data.area}</p>

			<h2>Languages</h2>

			<ul>
				{
					Object.values(data.languages).map( (value) => {
						return (<li key={uuidv4()} >{value}</li>)
					})
				}
			</ul>

			<Flag data={data} />
		</>
	)
}

export default FullCountrie
