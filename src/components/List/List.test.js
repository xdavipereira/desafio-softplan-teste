import React from "react";
import {
  render,
  wait,
  getByText,
  getByRole
} from "@testing-library/react";
import List, { COUNTRY_QUERY } from "./List";
import { MockedProvider } from "@apollo/client/testing";

const mocks = [
  {
    request: {
      query: COUNTRY_QUERY
    },
    result: {
      data: [
        {
          name: "Afghanistan",
          flag: {
            emoji: "🇦🇫"
          }
        }
      ]
    }
  }
];

describe("List", () => {
  it("render List whithout crash", () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <List />
      </MockedProvider>
    );
  });

  it(" shoud show a message of loading ", async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <List />
      </MockedProvider>
    );

    expect(getByText(container, "Loading")).toBeInTheDocument();
    await wait();
    
});


it(" should show a message of error", async () => {
    const dogMock = {
        request: {
            query: COUNTRY_QUERY
        },
        error: new Error('Error'),
    };
    
    const { container } = render(
        <MockedProvider mocks={[dogMock]} addTypename={false}>
        <List />
      </MockedProvider>
    );

    await wait();

    expect(getByRole(container, "alert")).toHaveTextContent('Error');


});
});
