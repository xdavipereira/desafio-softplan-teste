import React from "react";
import './CountryList.scss';

export default function CountryList({ countries }) {
  if (!countries || countries.length === 0) {
    return <div>No Countries</div>;
  }

  return (
    <ol className="cards-wrapper item-grid container-padding ">
      {countries.map(({ name, flag}, index) => (
        <li key={index} className="country-container">
          <div className="flag-container"> <img src={flag.svgFile} alt={name}></img> </div>
          <div data-testid="country-name" className="card-title">
            {name}
          </div>
        </li>
      ))}
    </ol>
  );
}
