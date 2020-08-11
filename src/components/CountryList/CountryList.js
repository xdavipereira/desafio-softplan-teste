import React from "react";
import './CountryList.scss';

import CardCountry from "../CardCountry/CardCountry";


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
