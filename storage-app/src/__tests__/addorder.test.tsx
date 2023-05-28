import '@testing-library/jest-dom';
import { BrowserRouter, useNavigate } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import AddOrder from '../components/AddOrder/AddOrder';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Preserve other exported functions and objects
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();

const items = [
  {
    itemName: 'Test item name 1',
    kind: 'Camera',
    serialNumber: 'Test serial number 1',
    condition: true
  },
  {
    itemName: 'Test item name 2',
    kind: 'Mic',
    serialNumber: 'Test serial number 2',
    condition: false
  }
];

describe('AddOrder', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { items: items }
    });

    (axios.post as jest.Mock).mockResolvedValue({
      data: {}
    });

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddOrder />
        </BrowserRouter>
      </Provider >
    );
  });


  it('adds the order correctly', async () => {
    userEvent.click(screen.getByRole('button', { name: "Check Avilability" }));

    await waitFor(() => {
      userEvent.click(screen.getByTestId(items[0].itemName));
      expect(mockNavigate).toHaveBeenCalledWith('/Student/studentGetOrders');
    });
  });
});
