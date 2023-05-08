import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor} from '@testing-library/react';
import LogIn from '../pages/LogIn/LogIn';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';

jest.mock('axios');

describe('Login', () => {
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
          <LogIn />
        </BrowserRouter>
      </Provider >
    );
  });

  it('renders the header', () => {
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders the email textbox', () => {
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
  });

  it('renders the password textbox', () => {
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
  });

  it('renders the Continue button', () => {
    expect(screen.getByRole('button', { name: "CONTINUE" })).toBeInTheDocument();
  });

  it('redirects to "/admin" when the user is an admin', async () => {
    userEvent.type(screen.getByPlaceholderText('your@email.com'), 'abc');
    userEvent.type(screen.getByPlaceholderText('password'), 'abc');
    userEvent.click(screen.getByRole('button', { name: "CONTINUE" }));

    await waitFor(() => expect(location.pathname).toBe('/admin'));
  });
});
