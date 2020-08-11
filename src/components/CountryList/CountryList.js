import React from "react";
import {useHistory} from 'react-router-dom';
import './CountryList.scss';

import { Card } from 'antd';
import { selectedCountryVar } from "../../App";
import useCountryService from '../../services/countryService'
import CardCountry from "../CardCountry/CardCountry";

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
