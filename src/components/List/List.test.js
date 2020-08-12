import React from "react";
import {
  render,
  wait,
  getByText,
  queryByTestId,
  getByRole,
  getAllByTestId,
  waitForElementToBeRemoved
} from "@testing-library/react";
import List from "./List";
import { MockedProvider } from "@apollo/client/testing";
import { COUNTRIES_QUERY } from "../../operations/countryQueries";

const mocks = [
  {
    request: {
      query: COUNTRIES_QUERY
    },
    result: {
      data: {
        countries: () => {
          return [];
        }
      }
    }
  }
];
const resolvers = {
  Query: {
    countries: () => {
      return [];
    },
    error: new Error("Error")
  }
};

describe("List", () => {
  let containerWrapper;

  beforeEach(() => {
    const { container } = render(
      <MockedProvider mocks={mocks} resolvers={resolvers} addTypename={false}>
        <List />
      </MockedProvider>
    );

    containerWrapper = container;
  });

  it("should show a message of loading ", async () => {
    expect(getByText(containerWrapper, "Loading")).toBeInTheDocument();
    await waitForElementToBeRemoved(() =>
      getByText(containerWrapper, "Loading")
    );
  });

  it("should show a message of error", async () => {

    const resolvers = {
      Query: {
        countries: new Error("Error")
      },

      error: new Error("")
    };

    const { container } = render(
      <MockedProvider
        resolvers={resolvers}
        addTypename={false}
      >
        <List />
      </MockedProvider>
    );

    expect(getByText(container, "Loading")).toBeInTheDocument();

    await wait();

    expect(getByRole(container, "alert")).toHaveTextContent("Error");
  });

  test(" render List Component", async () => {
    await wait();

    expect(queryByTestId(containerWrapper, "country-card")).toBeTruthy();
  });
});
