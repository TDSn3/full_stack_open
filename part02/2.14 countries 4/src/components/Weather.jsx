
const	Weather = ({ data }) =>
{
	if ( data === null)
	{
		console.log('Weather data === null')
		return
	}

	const url = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

	return (
		<>
			<p>temperature {data.main.temp} Celcius</p>
			<img src={url} alt={data.weather[0].description} />
			<p>wind {data.wind.speed} m/s</p>
		</>
	)
}

export default Weather
