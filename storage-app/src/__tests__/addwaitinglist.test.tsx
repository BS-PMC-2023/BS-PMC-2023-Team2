import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import AddWatingList from '../components/AddWatingList/AddWatingList';

jest.mock('axios');

describe('waiting list', () => {
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
          <AddWatingList/>
        </BrowserRouter>
      </Provider >
    );
  });

  it('checks for non existing text', () => {
    expect(screen.queryByLabelText('test')).toBeNull();
  });

  it('testing label from',()=>{ 
    expect(screen.getByLabelText(/From Date/)).toBeInTheDocument();
  });
  
  it('testing label to',()=>{ 
    expect(screen.getByLabelText(/To Date/)).toBeInTheDocument();
  });

  it('testing label Teacher name',()=>{ 
    expect(screen.getByLabelText(/Teacher Name/)).toBeInTheDocument();
  });

  it('testing label Teacher id',()=>{ 
    expect(screen.getByLabelText(/Teacher Id/)).toBeInTheDocument();
  });

  it('testing label item type',()=>{ 
    expect(screen.getByLabelText(/Item Type/)).toBeInTheDocument();
  });

  it('testing label item name',()=>{ 
    expect(screen.getByLabelText(/Item Name/)).toBeInTheDocument();
  });
  
  it('renders the Continue button', () => {
    expect(screen.getByRole('button', { name: "Submit" })).toBeInTheDocument();
  });

  it('redirects to "/admin" when the user is an admin', async () => {
    userEvent.click(screen.getByRole('button', { name: "Submit" }));
  });
});
