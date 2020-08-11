import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import CountryList from '../CountryList/CountryList';
import { countriesVar } from '../../App';
import { COUNTRY_QUERY_SERVER } from '../../operations/countryQueries';
import useCountryService from '../../services/countryService';
import { Input, Button } from 'antd';
import "./Search.scss";

const { Search } = Input;



export default function SearchInput() {

    const {handleSearchCountries, handleSetCountries} = useCountryService();

    const [searchValue, setSearchValue] = useState("");

  
    function handleChangeCountries(value) {
      const countries = handleSearchCountries(value)
      handleSetCountries(countries)
    }

    function handleClearSearch() {
      setSearchValue("");
      const countries = handleSearchCountries("")
      handleSetCountries(countries)

      handleChangeCountries("")
    }
    
    function handleSearch(value){
      setSearchValue(value);
      handleChangeCountries(value)
    }

    function handleOnChange(event) {
      setSearchValue(event.target.value)
    }


  
    return (
      <div data-testid="search-container" className="search-container" >

      <Search
            onChange={handleOnChange}
            value={searchValue}
            placeholder="Pesquisar"
            onSearch={handleSearch}
            enterButton
          />
      <Button type="primary" onClick={handleClearSearch} > Limpar</Button>

      </div>
    )
  }