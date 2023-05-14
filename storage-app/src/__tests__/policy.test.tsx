import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import Policy from '../components/Policy/Policy';
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
          <Policy/>
        </BrowserRouter>
      </Provider >
    );
  });

  it('renders the header', () => {
    expect(screen.getByRole('heading',{level:1})).toBeInTheDocument();
  });
  it('renders the header 1', () => {
    expect(screen.getByRole('heading',{level:3})).toBeInTheDocument();
  });

  it('testing label from',()=>{ 
    expect(screen.getByText(/The maximum/)).toBeInTheDocument();
  });

  it('testing label to',()=>{ 
    expect(screen.getByText(/If the/)).toBeInTheDocument();
  });
});
