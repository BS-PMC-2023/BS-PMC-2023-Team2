import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import Student from '../pages/Student/Student';
jest.mock('axios');


describe('Student', () => {
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
            <Student/>
        </BrowserRouter>
      </Provider >
    );
  });


 
  it('renders the header', () => {
    expect(screen.getByRole('heading',{level:1})).toBeInTheDocument();
  });
  it('renders the Personal button', () => {
    expect(screen.getByRole('button', { name: "Personal" })).toBeInTheDocument();
  });
  it('renders the Group button', () => {
    expect(screen.getByRole('button', { name: "Group" })).toBeInTheDocument();
  });
  it('test the text', () => {
    expect(screen.getByText(/Welcome/)).toBeInTheDocument();
  });
  it('test the text', () => {
    expect(screen.getByText(/to/)).toBeInTheDocument();
  });
  it('test the text', () => {
    expect(screen.getByText(/the/)).toBeInTheDocument();
  });
  it('test the text', () => {
    expect(screen.getByText(/Order/)).toBeInTheDocument();
  });
  it('test the text', () => {
    expect(screen.getByText(/page/)).toBeInTheDocument();
  });
});
