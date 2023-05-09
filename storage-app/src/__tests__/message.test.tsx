import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import Message from '../components/Message/Message';
jest.mock('axios');


describe('Message', () => {
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
        <Message/>
      </BrowserRouter>
    </Provider >
  );
});

  it('renders the header', () => {
    expect(screen.getByRole('heading',{level:3})).toBeInTheDocument();
  });
  it('testing text',()=>{ 
    expect(screen.getByText(/Great/)).toBeInTheDocument();
  });
  it('testing text 1',()=>{ 
    expect(screen.getByText(/product/)).toBeInTheDocument();
  });
  it('testing para',()=>{ 
    expect(screen.getByText(/The product has been added successfully!/)).toBeInTheDocument();
  });
});
