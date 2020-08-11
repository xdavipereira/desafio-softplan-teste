import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SHORTESTS_COUNTRIES_DISTANCE } from "../../operations/countryQueries";
import GoogleMapReact from "google-map-react";
import Marker from "../Marker/Marker";
import "./WorldMap.scss";

export default function WorldMap({ selectedCountry }) {
  const [shortestsCountries, setShortestsCountries] = useState([]);

  const [coordinates] = useState([
    selectedCountry.location.latitude,
    selectedCountry.location.longitude
  ]);

  const [loadShortestsCountryLocation, { loading, error, data }] = useLazyQuery(
    SHORTESTS_COUNTRIES_DISTANCE
  );

  useEffect(() => {
    const names = selectedCountry.distanceToOtherCountries.map(country => {
      return country.countryName;
    });

    loadShortestsCountryLocation({ variables: { countries: names } });
  }, []);

  useEffect(() => {
    if (data) {
      const countriesWithDistance = data.countries.map(
        countryWithoutDistance => {
          const country = selectedCountry.distanceToOtherCountries.find(
            countryDistance =>
              countryWithoutDistance.name === countryDistance.countryName
          );

          return Object.assign({}, countryWithoutDistance, {
            distanceInKm: country ? country.distanceInKm : 0
          });
        }
      );

      setShortestsCountries(countriesWithDistance);
    }
  }, [data]);

  if (loading) return <p>Loading</p>;
  if (error) return <p role="alert">Error</p>;

  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA3dUl_1g8NcqWmas032wz1rGNsG4JISfI" }}
        defaultCenter={coordinates}
        defaultZoom={4}
        yesIWantToUseGoogleMapApiInternals
      >
        {shortestsCountries.map((country, index) => {
          return (
            <Marker
              key={index}
              lat={country.location.latitude}
              lng={country.location.longitude}
              text={country.distanceInKm}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
