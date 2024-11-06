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
  days_left: -1,
  seller: {
    username: 'test_seller',
    profile_image_url: 'https://via.placeholder.com/40'
  },
  bid_count: 10,
  price: 100
};

it('renders truncated product description if too long', () => {
  const longDescriptionItem = {
    ...mockItem,
    product: {
      ...mockItem.product,
      description: 'This is a very long product description that should be truncated.'
    }
  };
  render(
    <Router>
      <ProductCard item={longDescriptionItem} />
    </Router>
  );
  expect(screen.getByText((content, element) => content.startsWith('This is a very long product description that should be'))).toBeInTheDocument();
});

it('renders "Auction Ended" badge if auction is finished', () => {
  const finishedAuctionItem = {
    ...mockItem,
    is_auction_finished: true
  };
  render(
    <Router>
      <ProductCard item={finishedAuctionItem} />
    </Router>
  );
  expect(screen.getByText('Auction Ended')).toBeInTheDocument();
});

it('renders "Buy Now" badge for buy now auction type', () => {
  render(
    <Router>
      <ProductCard item={mockItem} />
    </Router>
  );
  expect(screen.getByText('Buy Now')).toBeInTheDocument();
});

it('renders "bid now" badge for auction type', () => {
  const auctionItem = {
    ...mockItem,
    auction_type: 'bid'
  };
  render(
    <Router>
      <ProductCard item={auctionItem} />
    </Router>
  );
  expect(screen.getByText('Bid Now')).toBeInTheDocument();
});