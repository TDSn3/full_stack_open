
import axios from 'axios'

const baseUrl = '/api/persons' // 'http://localhost:3001/api/persons'

const getAll = () => {
	const request = axios.get(baseUrl)

	return (request.then( (response) => {
			console.log('Promise fulfilled')
	
			return (response.data)
		})
	)
}

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject)

	return (request.then( (response) => {
			console.log("POST to server.\nResponse data :", response.data)

			return (response.data)
		})
	)
}

const update = (id, newObject) => {
	const request = axios.put(baseUrl + `/${id}`, newObject)

	return (request.then( (response) => {
			console.log("PUT to server.\nResponse data :", response.data)

			return (response.data)
		})
	)
}

const deleteOne = (id) => {
	const request = axios.delete(baseUrl + `/${id}`)

	return (request
		.then( (response) => {
			console.log(`DELETE to server. Id: ${id}. Sucess`)

			return (response)
		})
	)
}

export default { getAll, create, update, deleteOne }
