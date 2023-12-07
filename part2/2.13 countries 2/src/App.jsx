
import { useState, useEffect } from 'react'
import axios from 'axios'

import Search from './components/Search.jsx'
import CountriesList from './components/CountriesList.jsx'

const App = () => {

    const [search, setSearche] = useState('')
    const [countriesListData, setCountriesListData] = useState([])

    const handleSearchChange = (event) => setSearche(event.target.value)

    const hookCountriesListData = () => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then( (response) => {
                console.log(response.data)
                setCountriesListData(countriesListData.concat(response.data))
            })
    }

    useEffect(hookCountriesListData, [])

    return (
        <div>
            <Search search={search} handleSearchChange={handleSearchChange} />
            <CountriesList countriesListData={countriesListData} search={search} />
        </div>
    )
}

export default App
