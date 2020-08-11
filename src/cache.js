import {InMemoryCache, makeVar } from '@apollo/client';

export const defaultCountriesVar = makeVar([]);
export const countriesVar = makeVar([]);
export const selectedCountryVar = makeVar();


export const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          defaultCountries: {
            read() {
              return defaultCountriesVar();
            }
          },
          countries: {
            read() {
              return countriesVar();
            }
          },
          selectedCountry: {
            read() {
              return selectedCountryVar();
            }
          }
        }
      }
    }
  });