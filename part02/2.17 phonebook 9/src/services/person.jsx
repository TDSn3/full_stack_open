
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

const deleteOne = (id) => {
	const response = axios.delete(baseUrl + `/${id}`)

	return (response
		.then( (response) => {
			console.log(`DELETE to server. Id: ${id}. Sucess`)

			return (response)
		})
	)
}

export default { getAll, create, deleteOne }
