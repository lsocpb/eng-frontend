import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './../ProductView';
import { useUser } from '../../UserContext/UserContext';
import axios from 'axios';
import { socketService } from '../../../services/socketService';
import Cookies from 'js-cookie';

jest.mock('axios');
jest.mock('js-cookie');
jest.mock('../../../services/socketService');
jest.mock('../../UserContext/UserContext');

const mockAuction = {
  id: 1,
  price: 100,
  is_auction_finished: false,
  auction_type: 'bid',
  product: {
    name: 'Test Product',
    description: 'Test Description',
    end_date: new Date(Date.now() + 10000).toISOString(),
    image_url_1: 'image1.jpg',
    image_url_2: 'image2.jpg',
    image_url_3: 'image3.jpg',
  },
  seller: {
    username: 'Test Seller',
    profile_image_url: 'seller.jpg',
  },
};

describe('ProductPage Component', () => {
  beforeEach(() => {
    useUser.mockReturnValue({ user: { username: 'testuser' } });
    Cookies.get.mockReturnValue('token');
    axios.get.mockResolvedValue({ data: mockAuction });
    socketService.connect.mockImplementation(() => {});
    socketService.followAuction.mockImplementation(() => {});
    socketService.addListener.mockImplementation(() => {});
    socketService.removeListener.mockImplementation(() => {});
    socketService.disconnect.mockImplementation(() => {});
  });

  it('renders loading spinner initially', () => {
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:auctionId" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders product details after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:auctionId" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('$100.00')).toBeInTheDocument();
    });
  });

  it('renders error message on fetch failure', async () => {
    axios.get.mockRejectedValue(new Error('Fetch error'));

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:auctionId" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch product data/i)).toBeInTheDocument();
    });
  });
});