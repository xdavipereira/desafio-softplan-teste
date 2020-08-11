import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import CountryList from "../CountryList/CountryList";
import {
  COUNTRIES_QUERY,
  COUNTRY_QUERY_LOCATION_SERVER
} from "../../operations/countryQueries";
import Search from "../Search/Search";
import CountryForm from "../CountryForm/CountryForm";
import GoogleMapReact from "google-map-react";
import Marker from "../Marker/Marker";




export default function WorldMap({ selectedCountry }) {
  const [shortestsCountries, setShortestsCountries] = useState([]);

  const [coordinates ] = useState([selectedCountry.location.latitude, selectedCountry.location.longitude])

  const [loadLocation, { loading, error, data }] = useLazyQuery(
    COUNTRY_QUERY_LOCATION_SERVER
  );

  useEffect(() => {
    loadLocation({ variables: { name: selectedCountry.name } });
  }, []);

  useEffect(() => {
    if (data) {
      const { borders, distanceToOtherCountries } = data.countries[0];
      const countries = borders.filter(countryBorder =>
        distanceToOtherCountries.find(
          countryDistance => countryBorder.name === countryDistance.countryName
        )
      );

      setShortestsCountries(countries)
    }
  }, [data]);

  function handleApiLoaded(map, maps) {
    console.log(map, maps);
  }
  if (loading) return <p>Loading</p>;
  if (error) return <p role="alert">Error</p>;

  return (
    <div style={{ width: "100vh", height: "600px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA3dUl_1g8NcqWmas032wz1rGNsG4JISfI" }}
        defaultCenter={coordinates}
        defaultZoom={4}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {shortestsCountries.map((country, index) => {
          return (
            <Marker
              key={index}
              lat={country.location.latitude}
              lng={country.location.longitude}
              text="33"
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
