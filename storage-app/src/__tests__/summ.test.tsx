import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import Summery from '../components/Summery/Summery';

jest.mock('axios');

render(
    <Provider store={store}>
      <BrowserRouter>
        <Summery />
      </BrowserRouter>
    </Provider >
  );
  it('renders the Show Inventory button', () => {
    expect(screen.getByRole('button', { name: "Show Inventory" })).toBeInTheDocument();
  });