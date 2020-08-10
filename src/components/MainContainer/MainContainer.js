import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import CountryList from '../CountryList/CountryList';
import { countriesVar } from '../../App';
import { COUNTRY_QUERY_SERVER } from '../../operations/countryQueries';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import List from '../List/List';
import Detail from '../Detail/Detail';




export default function MainContainer () {
    const { loading, error, data} = useQuery(
      COUNTRY_QUERY_SERVER, {
        onCompleted: onQueryComplete
      }
    );

    function onQueryComplete(data) {
      countriesVar(data.countries)
    }

    if (loading) return <p>Loading</p>;
    if (error) return <p  role="alert">Error</p>;

    return (
        <Switch>
        <Route exact path='/' component={List} />
        <Route path='/country/:name' component={Detail} />
    </Switch>
    )
}