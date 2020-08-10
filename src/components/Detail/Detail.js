import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link, useParams} from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import "./Detail.scss";
import CountryForm from '../CountryForm/CountryForm';
import { Form, Input, Button, Checkbox, Modal } from 'antd';

export const SELECTED_COUNTRY_QUERY = gql`
   query CountriesQuery {
    selectedCountry @client
  }
`;

export default function Home() {
  let { name } = useParams();
  
  const {loading, error, data} = useQuery(
    SELECTED_COUNTRY_QUERY
  );

  const [showModal, setShowModal ] = useState(false);
  
    useEffect(() => {
      console.log(data)
    })

    function handleShowModal() {
      setShowModal(true)
    }

    function handleCloseModal() {
      setShowModal(false)
    }


    return (
      <div  className="detail-container">
         <CountryForm showModal={showModal} handleCloseModal={handleCloseModal} />
        <div className="detail-image-container">
            <img src={data.selectedCountry.flag.svgFile} alt={data.selectedCountry.name} />
          
          </div>
          <div>
            <h1>{data.selectedCountry.name}</h1>
            <p><b>Capiral: </b> {data.selectedCountry.capital}</p>
            <p><b>Area: </b> {data.selectedCountry.area}</p>
            <p><b>Population: </b> {data.selectedCountry.population}</p>

            <p><b>Top Level Domain: </b>
              {data.selectedCountry.topLevelDomains.map((topLevelDomain) => {
                return (<span> {topLevelDomain.name}  </span>)
              }) 
            }
            </p>
          </div>
          <Button type="primary" onClick={handleShowModal}>
          Editar
        </Button>
          
      </div>
    )
}