import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import CountryList from '../CountryList/CountryList';
import './List.scss'
import { COUNTRIES_QUERY } from '../../operations/countryQueries';
import Search from '../Search/Search';
import CountryForm from '../CountryForm/CountryForm';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


export default function List() {

    const {loading, error, data} = useQuery(
      COUNTRIES_QUERY
    );

    useEffect(() => {
      console.log(data)
    })

    return (
      <div data-testid="country-card" >
        <Search  />
        <CountryList countries={data.countries} />
      </div>
    )
}
