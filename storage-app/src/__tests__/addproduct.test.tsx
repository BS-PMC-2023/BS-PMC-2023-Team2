import '@testing-library/jest-dom';
import { BrowserRouter, useNavigate } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import AddProduct from '../components/AddProduct/AddProduct';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Preserve other exported functions and objects
  useNavigate: jest.fn(),
}));

jest.setTimeout(10000);

const mockNavigate = jest.fn();

describe('AddProduct', () => {
  beforeEach(() => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: {}
    });

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddProduct />
        </BrowserRouter>
      </Provider >
    );
  });

  it('renders the true condition', () => {
    expect(screen.getByDisplayValue('OK')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    expect(screen.getByRole('button', { name: "Add Product" })).toBeInTheDocument();
  });

  it("renders Item Name input field and updates its value", () => {
    const inputElement = screen.getByLabelText(/Item Name:/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("renders Number input field and updates its value", () => {
    const inputElement = screen.getByLabelText(/Number:/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("adds a product when 'Add Product' button is clicked", async () => {
    jest.setTimeout(6000);

    userEvent.type(screen.getByLabelText(/Item Name:/i), '123')
    userEvent.type(screen.getByLabelText(/Number:/i), '345')
    userEvent.click(screen.getByRole('button', { name: "Add Product" }));

    await new Promise((resolve) => {
      setTimeout(resolve, 6000); // Wait for 6 seconds
    });

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });

});
