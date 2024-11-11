import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BidModal from '../BidModal';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showErrorToast, showSuccessToast } from '../../ToastNotifications/ToastNotifications';
import { MemoryRouter} from "react-router-dom";

jest.mock('axios');
jest.mock('js-cookie');
jest.mock('../../ToastNotifications/ToastNotifications');

const mockToggle = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
});

it('displays success toast when bid submission succeeds', async () => {
  Cookies.get.mockReturnValue('fake-token');
  axios.post.mockResolvedValue({ data: { message: 'Bid placed successfully' } });

  render(<BidModal isOpen={true} toggle={mockToggle} productName="Test Product" currentPrice={100} auctionId={1} />, { wrapper: MemoryRouter });
  fireEvent.change(screen.getByLabelText('Your offer (USD)'), { target: { value: '150' } });
  fireEvent.click(screen.getByText('Place a bid'));

  await waitFor(() => {
    expect(showSuccessToast).toHaveBeenCalledWith('Bid placed successfully');
  });
});

it('disables submit button when submitting a bid', async () => {
  Cookies.get.mockReturnValue('fake-token');
  axios.post.mockResolvedValue({ data: { message: 'Bid placed successfully' } });

  render(<BidModal isOpen={true} toggle={mockToggle} productName="Test Product" currentPrice={100} auctionId={1} />, { wrapper: MemoryRouter });
  fireEvent.change(screen.getByLabelText('Your offer (USD)'), { target: { value: '150' } });
  fireEvent.click(screen.getByText('Place a bid'));

  expect(screen.getByText('Submitting...')).toBeDisabled();
});