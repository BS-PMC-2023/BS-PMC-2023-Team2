import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import AdminLayout from '../pages/AdminLayout/AdminLayout';
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
            <AdminLayout/>
        </BrowserRouter>
      </Provider >
    );
  });

  it('testing text',()=>{ 
    expect(screen.getByText(/Welcome to the Admin page/)).toBeInTheDocument();
  });
  it('testing text',()=>{ 
    expect(screen.getByText(/Manage orders/)).toBeInTheDocument();
  });
  it('testing text',()=>{ 
    expect(screen.getByText(/add Products/)).toBeInTheDocument();
  });
  it('testing text',()=>{ 
    expect(screen.getByText(/add Students/)).toBeInTheDocument();
  });
  it('testing text',()=>{ 
    expect(screen.getByText(/display Faulty Products/)).toBeInTheDocument();
  });
});
