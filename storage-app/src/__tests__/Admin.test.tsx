import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import Admin from '../pages/Admin/Admin';
jest.mock('axios');


describe('Admin', () => {
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
            <Admin/>
        </BrowserRouter>
      </Provider >
    );
  });


 
  it('renders the header', () => {
    expect(screen.getByRole('heading',{level:1})).toBeInTheDocument();
  });

  it('testing text',()=>{ 
    expect(screen.getByText(/Admin/)).toBeInTheDocument();
  });
});
