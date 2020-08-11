import { gql} from '@apollo/client';

export const COUNTRY_QUERY_SERVER = gql`
query Country($name: String) {
  countries: Country(filter: {name_contains: $name}) {
    _id
    name,
    capital,
    area,
    alpha2Code,
    population,
    distanceToOtherCountries(first: 5) {
      countryName,
      distanceInKm
    },
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


export const SHORTESTS_COUNTRIES_DISTANCE = gql`
  query ShortetsCountries($countries: [String!]!) {
    countries: Country(filter:{ name_in: $countries}) {
      _id,
      name,
      location {
        latitude,
        longitude
      }
    }
    }
`;


export const COUNTRIES_QUERY = gql`
  query CountriesQuery {
    countries @client
  }
`;