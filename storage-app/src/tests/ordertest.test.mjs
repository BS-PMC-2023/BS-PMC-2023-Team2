import axios from 'axios';
import { handleSubmit } from './componentName';

jest.mock('axios');

describe('handleSubmit', () => {
  it('should dispatch LOGIN action with correct data on success', async () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();
    const mockResData = {
      token: 'mock-token',
      user: {
        userName: 'mock-user-name',
        isAdmin: true
      }
    };
    const mockUserParams = {
      current: {
        email: 'mock-email',
        password: 'mock-password'
      }
    };
    const mockProcessEnv = {
      REACT_APP_URL: 'mock-url'
    };
    localStorage.setItem = jest.fn();

    axios.post.mockResolvedValueOnce({ data: mockResData });
    await handleSubmit(mockDispatch, mockNavigate, mockUserParams, mockProcessEnv);

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'LOGIN',
      payload: {
        name: 'mock-user-name',
        token: 'mock-token'
      }
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should navigate to correct route when user is not admin', async () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();
    const mockResData = {
      token: 'mock-token',
      user: {
        userName: 'mock-user-name',
        isAdmin: false
      }
    };
    const mockUserParams = {
      current: {
        email: 'mock-email',
        password: 'mock-password'
      }
    };
    const mockProcessEnv = {
      REACT_APP_URL: 'mock-url'
    };
    localStorage.setItem = jest.fn();

    axios.post.mockResolvedValueOnce({ data: mockResData });
    await handleSubmit(mockDispatch, mockNavigate, mockUserParams, mockProcessEnv);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should console log error on failure', async () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();
    const mockUserParams = {
      current: {
        email: 'mock-email',
        password: 'mock-password'
      }
    };
    const mockProcessEnv = {
      REACT_APP_URL: 'mock-url'
    };
    console.log = jest.fn();

    axios.post.mockRejectedValueOnce(new Error('mock-error'));
    await handleSubmit(mockDispatch, mockNavigate, mockUserParams, mockProcessEnv);

    expect(console.log).toHaveBeenCalledWith(new Error('mock-error'));
  });
});
