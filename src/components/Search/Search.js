import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import CountryList from '../CountryList/CountryList';
import { countriesVar } from '../../App';
import { COUNTRY_QUERY_SERVER } from '../../operations/countryQueries';
import useCountryService from '../../services/countryService';



export default function Search() {
    const [loadCountries, { called, data, error }] = useLazyQuery(
      COUNTRY_QUERY_SERVER, {
          onCompleted: onCompletedQuery
      }
    );
    
    const [value, setValue] = useState("")
  
    const {handleSearchCountries, handleSetCountries} = useCountryService();

    function onCompletedQuery(data) {
        countriesVar([...data.countries])
    }
  
    function handleClick() {
      // loadCountries({variables: {name: value}})
      const countries = handleSearchCountries(value)
      handleSetCountries(countries)
    }
    
    
    function clearSearch() {
        setValue("");
        const countries = handleSearchCountries("")
        handleSetCountries(countries)
    }
  
  
    return (
      <div data-testid="search-container" >
        <input value={value}  onChange={(e) => setValue(e.target.value)} />
        <button onClick={handleClick}> Clique aqui</button>
        <button onClick={clearSearch}> Limpar</button>
      </div>
    )
  }