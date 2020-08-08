import React from 'react';
import { render,  fireEvent, getByText, getByPlaceholderText, getByTestId, getBy } from '@testing-library/react';
import App from './App';


describe('App', () => {
  

  it('render whithout crash', () => {
    const { container} = render(<App />);
  });

})