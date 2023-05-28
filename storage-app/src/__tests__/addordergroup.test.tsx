import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import AddOrder from '../components/AddOrder/AddOrder';
import AddOrderGroup from '../components/AddOrderGroup/AddOrderGroup';
jest.mock('axios');


describe('AddOrder', () => {
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
          <AddOrderGroup/>
        </BrowserRouter>
      </Provider >
    );
  });


  it('renders the Show Inventory button', () => {
    expect(screen.getByRole('button', { name: "Order" })).toBeInTheDocument();
  });

  it('renders the header', () => {
    expect(screen.getByRole('heading',{level:2})).toBeInTheDocument();
  });

  it('testing label from',()=>{ 
    expect(screen.getByLabelText(/From Date/)).toBeInTheDocument();
  });

  it('testing label to',()=>{ 
    expect(screen.getByLabelText(/To Date/)).toBeInTheDocument();
  });
});
