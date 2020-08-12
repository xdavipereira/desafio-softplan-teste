import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import "./Detail.scss";
import CountryForm from "../CountryForm/CountryForm";
import { Button } from "antd";
import WorldMap from "../WorldMap/WorldMap";
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router'


export const SELECTED_COUNTRY_QUERY = gql`
  query CountriesQuery {
    selectedCountry @client
  }
`;


function  Detail({ location }) {
  const history = useHistory();

  const { error, data } = useQuery(SELECTED_COUNTRY_QUERY);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data) {
      handleNavigateToHome();
    } else {
      setLoading(false);
    }
  }, []);

  function handleNavigateToHome() {
    history.push(`/`);
  }
  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  if (loading) return <p>Loading</p>;
  if (error) return <p role="alert">Error</p>;

  return (
    <div data-testid="detail-container"  className="detail-container container-margin">
      {showModal ? (
        <CountryForm
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      ) : null}
      <div className="content-wrapper">
        <div className="detail-image-container">
          <img
            src={data.selectedCountry.flag.svgFile}
            alt={data.selectedCountry.name}
          />
        </div>
        <div className="info-container">
          <h1>{data.selectedCountry.name}</h1>
          <p>
            <b>Capiral: </b> {data.selectedCountry.capital}
          </p>
          <p>
            <b>Area: </b> {data.selectedCountry.area}
          </p>
          <p>
            <b>Population: </b> {data.selectedCountry.population}
          </p>

          <p>
            <b>Top Level Domain: </b>
            {data.selectedCountry.topLevelDomains.map(
              (topLevelDomain, index) => {
                return <span key={index}> {topLevelDomain.name} </span>;
              }
            )}
          </p>
          <div className="buttons-container">
            <Button type="primary" onClick={handleShowModal}>
              Edit
            </Button>
            <Button onClick={handleNavigateToHome}>Back</Button>
          </div>
        </div>
      </div>
      <WorldMap selectedCountry={data.selectedCountry} />
    </div>
  );
}



export default withRouter(Detail)