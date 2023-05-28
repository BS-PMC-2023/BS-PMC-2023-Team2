import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import axios from 'axios';
import Exl from '../components/Exl/Exl';
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
          <Exl/>
        </BrowserRouter>
      </Provider >
    );
  });

  it('checks for non existing text label', () => {
    expect(screen.queryByLabelText('test')).toBeNull();
  });

  //test header
  it('testing header',()=>{
    expect(screen.getByRole('heading',{level:2})).toBeInTheDocument();
  }
  );

  //get by text
  it('testing text',()=>{
    expect(screen.getByText(/select/)).toBeInTheDocument();
  }
  );

  //get by text
  it('testing text',()=>{
    expect(screen.getByText(/file/)).toBeInTheDocument();
  }
  );

});
