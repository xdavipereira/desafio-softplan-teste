import 'antd/dist/antd.css';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { BrowserRouter} from 'react-router-dom'
import MainContainer from './components/MainContainer/MainContainer';
import { cache } from './cache';


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
