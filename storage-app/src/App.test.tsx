import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import LogIn from "./pages/LogIn/LogIn";
import * as ReactDOM from "react-dom";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/App/i);
  expect(linkElement).toBeInTheDocument();
});



describe("Login test", () => {
  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<LogIn />, container);
  });
  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });
  it("Renders Correctly", () => {
    const inputs = container.querySelectorAll("input");
    expect(inputs).ToHaveLength(2);
  });
});
