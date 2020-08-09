import React from "react";
import {
  render,
  wait,
  getByText,
  getByRole,
  getAllByTestId,
  waitForElementToBeRemoved
} from "@testing-library/react";
import CountryList from "./CountryList";

describe("CountryList", () => {

    let containerWrapper;

    beforeEach(() => {
        const { container } = render(<CountryList />);
        containerWrapper = container;
    })

  test('render "no countries message" when there are no countries', () => {
    expect(getByText(containerWrapper, /no countries/i)).toBeInTheDocument();
  });

  test("", async () => {
    const fakeCountries = [
        {
            "name": "Afghanistan",
            "flag": {
              "emoji": "🇦🇫",
              "svgFile": "https://restcountries.eu/data/afg.svg"
            }
          },
          {
            "name": "Åland Islands",
            "flag": {
              "emoji": "🇦🇽",
              "svgFile": "https://restcountries.eu/data/ala.svg"
            }
          }
      
    ];
    const { container } = render(<CountryList countries={fakeCountries} />);
    const countriesName = getAllByTestId(container, "country-name").map(country => country.textContent)
    const fakeCountriesNames = fakeCountries.map(country => country.name)
    expect(countriesName).toEqual(fakeCountriesNames)

});
});
