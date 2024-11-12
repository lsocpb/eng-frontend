import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AuthorizedNavbar from '../AuthorizedNavbar';
import { useUser } from '../../UserContext/UserContext';

jest.mock('axios');
jest.mock('../../UserContext/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('AuthorizedNavbar', () => {
  const mockUser = { role: 'user' };

  beforeEach(() => {
    useUser.mockReturnValue({ user: mockUser });
  });

  it('renders AuthorizedNavbar component', () => {
    render(<AuthorizedNavbar />);
    expect(screen.getByAltText('CharFair logo')).toBeInTheDocument();
  });

  it('displays search results when search is successful', async () => {
    const mockResults = [{ id: 1, product: { name: 'Product 1', image_url_1: '' }, price: 100 }];
    axios.post.mockResolvedValue({ data: { auctions: mockResults } });

    render(<AuthorizedNavbar />);
    fireEvent.change(screen.getByPlaceholderText('Search for products...'), { target: { value: 'Product' } });
    fireEvent.submit(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => expect(screen.getByText('1 Results found')).toBeInTheDocument());
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });
});