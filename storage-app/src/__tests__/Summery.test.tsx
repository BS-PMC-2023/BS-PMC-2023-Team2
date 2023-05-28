import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import Summery from '../components/Summery/Summery';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

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

describe('Summery', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: items
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Summery />
        </BrowserRouter>
      </Provider >
    );
  });

  it('renders the added products correctly', async () => {
    userEvent.click(screen.getByRole('button', { name: 'Show Inventory' }));
    await waitFor(() => {
      items.forEach((item) => {
        expect(screen.getByText(item.itemName)).toBeInTheDocument();
        expect(screen.getByText(item.kind)).toBeInTheDocument();
        expect(screen.getByText(item.serialNumber)).toBeInTheDocument();
        expect(screen.getByText(item.condition ? "OK" : "Fauly")).toBeInTheDocument();
      })
    });
  });
});
