import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link, useParams} from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import "./Detail.scss";
import CountryForm from '../CountryForm/CountryForm';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { COUNTRY_QUERY_LOCATION_SERVER } from '../../operations/countryQueries';
import WorldMap from '../WorldMap/WorldMap';
import {useHistory} from 'react-router-dom';

export const SELECTED_COUNTRY_QUERY = gql`
   query CountriesQuery {
    selectedCountry @client
  }
`;

export default function Home() {
  let { name } = useParams();
  const history = useHistory();
  
  const { error, data} = useQuery(
    SELECTED_COUNTRY_QUERY
  );


  const [showModal, setShowModal ] = useState(false);
  const [loading, setLoading ] = useState(true);


    useEffect(() => {
      if(!data) {
        handleNavigateToHome();
      } else {
        setLoading(false)
      }
    }, [])
    
    function handleNavigateToHome() {
 
     history.push(`/`)
     
   }
    function handleShowModal() {
      setShowModal(true)
    }

    function handleCloseModal() {
      setShowModal(false)
    }

    if (loading) return <p>Loading</p>;
    if (error) return <p  role="alert">Error</p>;


    return (
      <div  className="detail-container">


          { showModal ? 

            <CountryForm showModal={showModal} handleCloseModal={handleCloseModal} /> : null
          }
        <div className="detail-image-container">
            <img src={data.selectedCountry.flag.svgFile} alt={data.selectedCountry.name} />
          
          </div>
          <div>
            <h1>{data.selectedCountry.name}</h1>
            <p><b>Capiral: </b> {data.selectedCountry.capital}</p>
            <p><b>Area: </b> {data.selectedCountry.area}</p>
            <p><b>Population: </b> {data.selectedCountry.population}</p>

            <p><b>Top Level Domain: </b>
              {data.selectedCountry.topLevelDomains.map((topLevelDomain, index) => {
                return (<span key={index}> {topLevelDomain.name}  </span>)
              }) 
            }
            </p>
          <Button type="primary" onClick={handleShowModal}>
          Editar
        </Button>
          </div>
            <WorldMap selectedCountry={data.selectedCountry}  />
      </div>
    )
}