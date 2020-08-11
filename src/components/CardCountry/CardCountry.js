import React from "react";
import {useHistory} from 'react-router-dom';
import './CardCountry.scss';

import { Card } from 'antd';
import { selectedCountryVar } from "../../App";
import useCountryService from '../../services/countryService'

const { Meta } = Card;

export default function CardCountry({ country}) {
  
  const history = useHistory();
  const {handleSelectedCountry } = useCountryService();

   function handleNavigateToDetail() {
    
    handleSelectedCountry(country);
    
    history.push(`/country/${country.name}`)
    
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
