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
});

it('calls toggle function when cancel button is clicked', () => {
  render(<BidModal isOpen={true} toggle={mockToggle} productName="Test Product" currentPrice={100} auctionId={1} />, { wrapper: MemoryRouter });
  fireEvent.click(screen.getByText('Cancel'));
  expect(mockToggle).toHaveBeenCalled();
});

it('displays error toast when bid submission fails', async () => {
  Cookies.get.mockReturnValue('fake-token');
  axios.post.mockRejectedValue({ response: { data: { detail: 'Error message' } } });

  render(<BidModal isOpen={true} toggle={mockToggle} productName="Test Product" currentPrice={100} auctionId={1} />, { wrapper: MemoryRouter });

  fireEvent.change(screen.getByLabelText('Your offer (USD)'), { target: { value: '150' } });
  fireEvent.click(screen.getByText('Place a bid'));

  await waitFor(() => {
    expect(showErrorToast).toHaveBeenCalledWith('Error message');
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