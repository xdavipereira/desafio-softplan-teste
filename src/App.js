import 'antd/dist/antd.css';
import React from 'react';
import { ApolloProvider, useQuery, makeVar } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import List from './components/List/List';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import MainContainer from './components/MainContainer/MainContainer';

export const countriesVar = makeVar([]);
export const selectedCountryVar = makeVar();


export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
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

const client = new ApolloClient({
  uri: 'https://countries-274616.ew.r.appspot.com/',
  cache: cache
});

function App() {
  return (
    <ApolloProvider client={client}>
        <BrowserRouter>
          <MainContainer />
        </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
