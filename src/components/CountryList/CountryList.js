import React from "react";
import {useHistory} from 'react-router-dom';
import './CountryList.scss';

import { Card } from 'antd';
import { selectedCountryVar } from "../../App";

const { Meta } = Card;

export default function CountryList({ countries }) {
  
  if (!countries || countries.length === 0) {
    return <div>No Countries</div>;
  }

  return (
    <ol className="cards-wrapper item-grid container-padding ">
      {countries.map((country, index) => (
        <CardCountry  key={index} country={country}  />

        ))}
    </ol>
  );
}


function CardCountry({ country}) {
  
  const history = useHistory();

  async function handleNavigateToDetail() {
    
    await handleSelectedCountry(country);
    
    history.push(`/country/${country.name}`)
    
  }

  async function handleSelectedCountry(country){
    await selectedCountryVar(country)
  }

  return (
    <li className="country-container" onClick={handleNavigateToDetail} >
      <Card
        hoverable
        cover={<img src={country.flag.svgFile} alt={country.name}></img>}
      >
        <Meta title={country.name} description={country.capital} />
      </Card>
    </li>
  )
}
