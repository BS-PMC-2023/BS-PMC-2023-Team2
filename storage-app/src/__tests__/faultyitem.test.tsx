import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor} from '@testing-library/react';
import LogIn from '../pages/LogIn/LogIn';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import FoultyItems from '../components/FoultyItems/FoultyItems';

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
          <FoultyItems/>
        </BrowserRouter>
      </Provider >
    );
  });

  it('renders the Continue button', () => {
    expect(screen.getByRole('button', { name: "Show Faulty Products" })).toBeInTheDocument();
  });
});
