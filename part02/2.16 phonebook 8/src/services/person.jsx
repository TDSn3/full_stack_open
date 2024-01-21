
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	const request = axios.get(baseUrl)

	return (request.then( (response) => {
			console.log('Promise fulfilled')
	
			return (response.data)
		})
	)
}

const create = (newObject) => {
	const response = axios.post(baseUrl, newObject)

	return (response.then( (response) => {
			console.log("POST to server.\nResponse data :", response.data)

			return (response.data)
		})
	)
}

export default { getAll, create }
