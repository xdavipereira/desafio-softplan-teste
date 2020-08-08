import React from 'react';
import { ApolloProvider, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import List from './components/List/List';

const client = new ApolloClient({
  uri: 'https://countries-274616.ew.r.appspot.com/',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
        <List />
    </ApolloProvider>
  );
}

export default App;
