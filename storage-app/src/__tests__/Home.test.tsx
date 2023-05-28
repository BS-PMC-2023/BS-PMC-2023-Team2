import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import Error from '../pages/404/Error';
import Home from '../pages/Home/Home';
jest.mock('axios');


describe('Error', () => {
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
        <BrowserRouter>a
            <Home/>
        </BrowserRouter>
      </Provider >
    );
  });

  it('testing text',()=>{ 
    expect(screen.getByText(/Your Way To/)).toBeInTheDocument();
  });
  it('testing text',()=>{ 
    expect(screen.getByText(/Order Products/)).toBeInTheDocument();
  });
  it('testing text',()=>{ 
    expect(screen.getByText(/Make Order/)).toBeInTheDocument();
  });
  it('testing text',()=>{ 
    expect(screen.getByText(/Your Orders/)).toBeInTheDocument();
  });
});
