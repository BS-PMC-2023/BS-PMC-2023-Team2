import '@testing-library/jest-dom';
import { BrowserRouter, useNavigate } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import NavBar from '../components/NavBar/NavBar';
import userEvent from '@testing-library/user-event';
import { store } from "../redux/Store";
import { useSelector, Provider } from 'react-redux';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Preserve other exported functions and objects
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // Preserve other exported functions and objects
  useSelector: jest.fn(),
}));

const mockNavigate = jest.fn();

describe('Navbar', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSelector as jest.Mock).mockReturnValue({
      name: 'Test name',
      token: '123',
      isAdmin: 'true'
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider >
    );
  });

  it('logs out a user when "Log Out" button is clicked', async () => {
    userEvent.click(screen.getByRole('button', { name: 'Log Out' }));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });

});
