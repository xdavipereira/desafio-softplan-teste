import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import CountryList from '../CountryList/CountryList';
import { countriesVar } from '../../App';
import { COUNTRY_QUERY_SERVER } from '../../operations/countryQueries';



export default function Search() {
    const [loadCountries, { called, data, error }] = useLazyQuery(
      COUNTRY_QUERY_SERVER, {
          onCompleted: onCompletedQuery
      }
    );
    
    const [value, setValue] = useState("")
  
    function onCompletedQuery(data) {
        countriesVar([...data.countries])
    }
  
    function handleClick() {
      loadCountries({variables: {name: value}})
    }
    
    
    function clearSearch() {
        loadCountries({variables: {name: ""}})
        setValue("");
    }
  
  
    return (
      <div data-testid="search-container" >
        <input value={value}  onChange={(e) => setValue(e.target.value)} />
        <button onClick={handleClick}> Clique aqui</button>
        <button onClick={clearSearch}> Limpar</button>
      </div>
    )
  }