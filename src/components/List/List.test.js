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
  let containerWrapper;

  beforeEach(() => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
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
    const queryErrorMock = {
      request: {
        query: COUNTRY_QUERY
      },
      error: new Error("Error")
    };

    const { container } = render(
      <MockedProvider mocks={[queryErrorMock]} addTypename={false}>
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
