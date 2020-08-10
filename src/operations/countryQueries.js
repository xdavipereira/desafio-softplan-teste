import { gql, useQuery, useLazyQuery } from '@apollo/client';

export const COUNTRY_QUERY_SERVER = gql`
query Country($name: String) {
  countries: Country(filter: {name_contains: $name}) {
    _id
    name,
    capital,
    area,
    population,
    topLevelDomains {
      _id,
      name
    }
    flag {
      emoji
      svgFile
    }
  }
}

`;


export const COUNTRIES_QUERY = gql`
  query CountriesQuery {
    countries @client
  }
`;