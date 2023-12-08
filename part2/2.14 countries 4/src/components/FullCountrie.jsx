
import { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import Flag from './Flag.jsx'
import Weather from './Weather.jsx'

const FullCountrie = ({ data }) => {	

	const [weather, setweather] = useState(null)

	const cityName = data.capital

    const hookWeatherData = () => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}&units=metric`)
            .then( (response) => {
                console.log('Weather : ', response.data)
                setweather(response.data)
            })
    }

    useEffect(hookWeatherData, [])

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

			<h2>Weather in {data.capital}</h2>

			<Weather data={weather} />
		</>
	)
}

export default FullCountrie
