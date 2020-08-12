import React from "react";
import {
  render,
  wait,
  getByText,
  getByTestId,
  getByRole,
  getByAltText,
  screen, 
  getAllByTestId,
  waitForElementToBeRemoved,
  fireEvent,
  waitForElement
} from "@testing-library/react";
import CardCountry from "./CardCountry";
import { MockedProvider } from "@apollo/client/testing";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Detail from "../Detail/Detail";


const fakeCountry = 
  {
      "name": "Brazil",
      "capital": "brasilia",
      "flag": {
        "emoji": "🇦🇫",
        "svgFile": "https://restcountries.eu/data/afg.svg"
      }
    }


    
  describe("CardCountry", () => {
  const mockHadleNavigation = jest.fn();
  let containerWrapper;

  beforeEach(() => {
    const { container } = render(
      <MockedProvider addTypename={false}>
        <CardCountry onNavigateToDetail={mockHadleNavigation} country={fakeCountry}   />
      </MockedProvider>
    );

    containerWrapper = container;
  });
  


  test('card have a Country Name', () => {
    expect(getByText(containerWrapper, /brazil/i)).toBeTruthy()
  });

  test('card have a capital Name', () => {
    expect(getByText(containerWrapper, /brasilia/i)).toBeTruthy()
  });


  test('card have a image with alt  atribute equal to country name', () => {
    expect(getByAltText(containerWrapper, /brazil/i)).toBeTruthy()
  });

});
