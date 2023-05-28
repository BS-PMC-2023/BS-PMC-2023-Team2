import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import EmailForm from '../components/EmailForm/EmailForm';
jest.mock('axios');


describe('EmailForm', () => {
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
          <EmailForm/>
        </BrowserRouter>
      </Provider >
    );
  });


  it('renders the Submit button', () => {
    expect(screen.getByRole('button', { name: "Send Email" })).toBeInTheDocument();
  });

  it('renders the header', () => {
    expect(screen.getByRole('heading',{level:2})).toBeInTheDocument();
  });

  it('testing label from',()=>{ 
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  });

  it('testing label to',()=>{ 
    expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
  });

  
});
