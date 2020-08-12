import React from "react";
import './CountryList.scss';
import {useHistory} from 'react-router-dom';

import CardCountry from "../CardCountry/CardCountry";
import useCountryService from "../../services/countryService";


export default function CountryList({ countries }) {

  const history = useHistory();
  const {handleSelectedCountry } = useCountryService();

   function handleNavigateToDetail(country) {
    
    handleSelectedCountry(country);
    
    history.push(`/country/${country.name}`)
    
  }



  
  if (!countries || countries.length === 0) {
    return <div>No Countries</div>;
  }

  return (
    <ol data-testid="country-list" className="cards-wrapper item-grid container-padding ">
      {countries.map((country, index) => (
        <CardCountry  onNavigateToDetail={handleNavigateToDetail} key={index} country={country}  />

        ))}
    </ol>
  );
}
