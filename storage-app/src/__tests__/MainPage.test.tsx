import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import Error from '../pages/404/Error';
import MainPage from '../pages/MainPage/MainPage';
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
            <MainPage/>
        </BrowserRouter>
      </Provider >
    );
  });


 
  it('renders the header', () => {
    expect(screen.getByRole('heading',{level:1})).toBeInTheDocument();
  });
  it('renders the header', () => {
    expect(screen.getByText(/SCE/)).toBeInTheDocument();
  });

  
});
