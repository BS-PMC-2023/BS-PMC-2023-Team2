import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import FoultyItems from '../components/FoultyItems/FoultyItems';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

const faultyItems = [
  {
    itemName: 'Test item name 1',
    kind: 'Camera',
    serialNumber: 'Test serial number 1'
  },
  {
    itemName: 'Test item name 2',
    kind: 'Mic',
    serialNumber: 'Test serial number 2'
  }
];

describe('Product', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { FaultyProducts: faultyItems }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <FoultyItems />
        </BrowserRouter>
      </Provider >
    );
  });

  it('renders the faulty products correctly', async () => {
    userEvent.click(screen.getByRole('button', { name: 'Show Faulty Products' }));
    await waitFor(() => {
      faultyItems.forEach((faultyItem) => {
        expect(screen.getByText(faultyItem.itemName)).toBeInTheDocument();
        expect(screen.getByText(faultyItem.kind)).toBeInTheDocument();
        expect(screen.getByText(faultyItem.serialNumber)).toBeInTheDocument();
      })
    });
  });
});
