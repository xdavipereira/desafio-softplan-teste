import React from "react";
import {
  render,
  wait,
  getByText,
  getByTestId,
  getByRole,
  getAllByTestId,
  waitForElementToBeRemoved
} from "@testing-library/react";
import CountryList from "./CountryList";

describe("CountryList", () => {



  test('render "no countries message" when there are no countries', () => {
    const { container } = render(<CountryList />);
    const containerWrapper = container;
    expect(getByText(containerWrapper, /no countries/i)).toBeInTheDocument();
  });


});
