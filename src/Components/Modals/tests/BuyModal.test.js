import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BuyModal from '../BuyModal';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showErrorToast, showSuccessToast } from '../../ToastNotifications/ToastNotifications';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');
jest.mock('js-cookie');
jest.mock('../../ToastNotifications/ToastNotifications');

const mockToggle = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

it('calls toggle function when cancel button is clicked', () => {
  render(<BuyModal isOpen={true} toggle={mockToggle} productName="Test Product" productPrice={100} auctionId={1} />, { wrapper: MemoryRouter });
  fireEvent.click(screen.getByText('Cancel'));
  expect(mockToggle).toHaveBeenCalled();
});

it('displays error toast when purchase fails', async () => {
  Cookies.get.mockReturnValue('fake-token');
  axios.post.mockRejectedValue({ response: { data: { detail: 'Error message' } } });

  render(<BuyModal isOpen={true} toggle={mockToggle} productName="Test Product" productPrice={100} auctionId={1} />, { wrapper: MemoryRouter });
  fireEvent.click(screen.getByText('Buy Now'));
  fireEvent.click(screen.getByText('Confirm Purchase'));

  await waitFor(() => {
    expect(showErrorToast).toHaveBeenCalledWith({"response": {"data": {"detail": "Error message"}}});
  });
});

it('displays success toast when purchase succeeds', async () => {
  Cookies.get.mockReturnValue('fake-token');
  axios.post.mockResolvedValue({ data: { message: 'Item purchased successfully' } });

  render(<BuyModal isOpen={true} toggle={mockToggle} productName="Test Product" productPrice={100} auctionId={1} />, { wrapper: MemoryRouter });
  fireEvent.click(screen.getByText('Buy Now'));
  fireEvent.click(screen.getByText('Confirm Purchase'));

  await waitFor(() => {
    expect(showSuccessToast).toHaveBeenCalledWith('Item purchased successfully, we notified buyer and will contact you soon');
  });
});

it('disables confirm button when submitting a purchase', async () => {
  Cookies.get.mockReturnValue('fake-token');
  axios.post.mockResolvedValue({ data: { message: 'Item purchased successfully' } });

  render(<BuyModal isOpen={true} toggle={mockToggle} productName="Test Product" productPrice={100} auctionId={1} />, { wrapper: MemoryRouter });
  fireEvent.click(screen.getByText('Buy Now'));
  fireEvent.click(screen.getByText('Confirm Purchase'));

  expect(screen.getByText('Purchasing...')).toBeDisabled();
});