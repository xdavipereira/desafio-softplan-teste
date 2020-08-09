import React from 'react';
import { gql, useQuery } from '@apollo/client';
import CountryList from '../CountryList/CountryList';
import './List.scss'


export const COUNTRY_QUERY = gql`
query Country($name: String) {
  countries: Country(filter: {name_contains: $name}) {
    _id
    name
    flag {
      emoji
      svgFile
    }
  }
}

`;

export default function List() {
    const { loading, error, data } = useQuery(COUNTRY_QUERY);

    if (loading) return <p>Loading</p>;
    if (error) return <p  role="alert">Error</p>;
    return (
      <div data-testid="country-card" >
        <CountryList countries={data ? data.countries : []} />
      </div>
    )
}