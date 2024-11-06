import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import WalletDropdown from '../WalletDropdown';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');
jest.mock('js-cookie');

test('displays loading spinner when fetching wallet data', async () => {
  Cookies.get.mockReturnValue('fake-token');
  axios.get.mockResolvedValueOnce({ data: { balance_total: 200.0, balance_reserved: 50.0 } });

  render(<WalletDropdown />, { wrapper: MemoryRouter });

  const toggleButton = screen.getByRole('button', { name: /wallet/i });
  fireEvent.click(toggleButton);

  expect(screen.getByRole('status')).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
});

test('displays error message on data fetch failure', async () => {
  Cookies.get.mockReturnValue('fake-token');
  axios.get.mockRejectedValueOnce(new Error('Network Error'));

  render(<WalletDropdown />, { wrapper: MemoryRouter });

  const toggleButton = screen.getByRole('button', { name: /wallet/i });
  fireEvent.click(toggleButton);

  await waitFor(() => expect(screen.getByText(/failed to load wallet data/i)).toBeInTheDocument());
});

test('displays wallet balance and available amount correctly', async () => {
  Cookies.get.mockReturnValue('fake-token');
  axios.get.mockResolvedValueOnce({
    data: { balance_total: 200.0, balance_reserved: 50.0 },
  });

  render(<WalletDropdown />, { wrapper: MemoryRouter });

  const toggleButton = screen.getByRole('button', { name: /wallet/i });
  fireEvent.click(toggleButton);

  await waitFor(() => expect(screen.getByText(/\$200\.00/)).toBeInTheDocument());
  expect(screen.getByText(/available: \$150\.00/i)).toBeInTheDocument();
  expect(screen.getByText(/reserved: \$50\.00/i)).toBeInTheDocument();
});

test('renders add funds and transaction history buttons with correct links', async () => {
  Cookies.get.mockReturnValue('fake-token');
  axios.get.mockResolvedValueOnce({ data: { balance_total: 200.0, balance_reserved: 50.0 } });

  render(<WalletDropdown />, { wrapper: MemoryRouter });

  const toggleButton = screen.getByRole('button', { name: /wallet/i });
  fireEvent.click(toggleButton);

  await waitFor(() => expect(screen.getByText(/add funds/i)).toHaveAttribute('href', '/wallet/add-funds'));
  expect(screen.getByText(/transaction history/i)).toHaveAttribute('href', '/wallet/transaction/history');
});
