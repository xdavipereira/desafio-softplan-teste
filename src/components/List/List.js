import React from 'react';
import { gql, useQuery } from '@apollo/client';


export const COUNTRY_QUERY = gql`
query Country {

  countries: Country {
    name
    flag {
      emoji,
    }
  }
}
`;

export default function List({}) {
    const { loading, error, data } = useQuery(COUNTRY_QUERY);

    if (loading) return <p>Loading</p>;
    if (error) return <p  role="alert">Error</p>;
    
    return (<div>Nao</div>)
}