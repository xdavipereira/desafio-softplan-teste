import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import CountryList from "../CountryList/CountryList";
import "./List.scss";
import { COUNTRIES_QUERY } from "../../operations/countryQueries";
import Search from "../Search/Search";

export default function List() {
  const {  data, loading, error } = useQuery(COUNTRIES_QUERY);

 
  if (loading) return <p>Loading</p>;
  if (error) return <p role="alert">Error</p>;


  return (
    <div data-testid="country-card">
      <Search />
      <CountryList countries={data.countries} />
    </div>
  );
}
