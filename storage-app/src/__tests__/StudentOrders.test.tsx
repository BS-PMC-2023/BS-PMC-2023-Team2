import '@testing-library/jest-dom';
import { BrowserRouter, useNavigate } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import StudentOrders from '../components/StudentsOrders/StudentOrders';

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

describe('StudentOrders', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue(items);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentOrders />
        </BrowserRouter>
      </Provider >
    );
  });


  it('renders the orders correctly', async () => {
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
