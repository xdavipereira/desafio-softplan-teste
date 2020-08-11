import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import CountryList from "../CountryList/CountryList";
import "./List.scss";
import { COUNTRIES_QUERY } from "../../operations/countryQueries";
import Search from "../Search/Search";

export default function List() {
  const {  data } = useQuery(COUNTRIES_QUERY);

  useEffect(() => {
    console.log(data);
  });

  return (
    <div data-testid="country-card">
      <Search />
      <CountryList countries={data.countries} />
    </div>
  );
}
