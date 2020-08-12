import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import './CardCountry.scss';

import { Card } from 'antd';
import useCountryService from '../../services/countryService'

const { Meta } = Card;

export default function CardCountry({ onNavigateToDetail, country}) {


  function handleNavigateToDetail() {
      onNavigateToDetail(country)
  }


  return (
    <li className="country-container" data-testid="country-item" onClick={handleNavigateToDetail} >
      <Card
        hoverable
        cover={<img src={country.flag.svgFile} alt={country.name}></img>}
      >
        <Meta title={country.name} description={country.capital} />
      </Card>
    </li>
  )
}
