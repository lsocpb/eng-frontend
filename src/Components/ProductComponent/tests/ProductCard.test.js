import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { BrowserRouter as Router } from 'react-router-dom';

const mockItem = {
  id: 1,
  auction_type: 'buy_now',
  product: {
    name: 'Test Product',
    description: 'This is a test product description.',
    image_url_1: 'https://via.placeholder.com/150'
  },
  category: {
    category_id: 1
  },
  days_left: 5,
  seller: {
    username: 'test_seller',
    profile_image_url: 'https://via.placeholder.com/40'
  },
  bid_count: 10,
  price: 100
};

describe('ProductCard Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <ProductCard item={mockItem} />
      </Router>
    );
  });

  it('renders product name', () => {
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('renders product description', () => {
    expect(screen.getByText('This is a test product description.')).toBeInTheDocument();
  });

  it('renders seller username', () => {
    expect(screen.getByText('test_seller')).toBeInTheDocument();
  });

  it('renders default seller username if not provided', () => {
    const noSellerItem = {
      ...mockItem,
      seller: {}
    };
    render(
      <Router>
        <ProductCard item={noSellerItem} />
      </Router>
    );
    expect(screen.getByText('Anonymous')).toBeInTheDocument();
  });

  it('renders "Buy Now" button for buy now auction type', () => {
    expect(screen.getByText('Buy Now')).toBeInTheDocument();
  });

  it('renders "Bid Now" button for bid auction type', () => {
    const bidItem = {
      ...mockItem,
      auction_type: 'bid'
    };
    render(
      <Router>
        <ProductCard item={bidItem} />
      </Router>
    );
    expect(screen.getByText('Bid Now')).toBeInTheDocument();
  });

  it('renders product price', () => {
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('renders number of bids', () => {
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders "New" badge', () => {
    expect(screen.getByText('New')).toBeInTheDocument();
  });
});