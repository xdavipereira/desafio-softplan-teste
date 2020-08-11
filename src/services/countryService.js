import React, {useState, useEffect, Fragment, useContext} from 'react';
import { selectedCountryVar, countriesVar, defaultCountriesVar} from '../App';

export default function useCountryService() {


    function handleSelectedCountry(country) {
        selectedCountryVar(country)
    }
    
    function handleSetDefaultCountries(countries) {
        defaultCountriesVar(countries)
    }

    function handleSetCountries (countries) {    
        countriesVar(countries)
    }
    
    function handleGetCountries() {
        return countriesVar();
    }
    function handleGetDefaultCountries() {
        return defaultCountriesVar();
    }

    function handleGetSelectedCountry() {
        return selectedCountryVar()
    }
    

    function handleSearchCountries(search) {
        if(search  === undefined || search === "") {
            return handleGetDefaultCountries()
        }

        const countries = handleGetCountries().filter((country) => country.name.toLowerCase().indexOf(search) > -1) ;
        return countries;
    }

  return { handleSetDefaultCountries, handleSelectedCountry, handleSearchCountries, handleGetSelectedCountry, handleSetCountries };
}
