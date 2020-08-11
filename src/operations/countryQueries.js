import { gql, useQuery, useLazyQuery } from '@apollo/client';

export const COUNTRY_QUERY_SERVER = gql`
query Country($name: String) {
  countries: Country(filter: {name_contains: $name}) {
    _id
    name,
    capital,
    area,
    population,
    location {
      longitude,
      latitude,
      x,
      y
    },
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

export const COUNTRY_QUERY_LOCATION_SERVER = gql`
query Country($name: String) {
  countries: Country(filter: {name_contains: $name}) {
			...location
    borders {
      _id,
      name,
			...location
    }
    distanceToOtherCountries(first: 5) {
      distanceInKm
      countryName,
    }

  }
}

fragment location on Country {
  location {
    longitude,
    latitude,
    x,
    y
  },
}
`;


export const COUNTRIES_QUERY = gql`
  query CountriesQuery {
    countries @client
  }
`;