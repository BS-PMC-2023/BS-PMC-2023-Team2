import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import AddProduct from '../components/AddProduct/AddProduct';

jest.mock('axios');

describe('Product', () => {
  beforeEach(() => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        token: 'testToken',
        user: {
          userName: 'testUserName',
          isAdmin: 'true'
        }
      }
    });

render(
      <Provider store={store}>
        <BrowserRouter>
          <AddProduct/>
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
});
