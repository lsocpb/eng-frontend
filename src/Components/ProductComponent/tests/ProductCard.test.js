import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../CategoryNavigator/CategoryNavigator', () => {
  return function MockCategoryNavigator({ category_id }) {
    return <div data-testid="category-navigator">Category {category_id}</div>;
  };
});

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

const renderProductCard = (itemProps = {}) => {
  const item = { ...mockItem, ...itemProps };
  return render(
    <Router>
      <ProductCard item={item} />
    </Router>
  );
};

describe('ProductCard Component', () => {
  it('renders product name', () => {
    renderProductCard();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('renders product description', () => {
    renderProductCard();
    expect(screen.getByText('This is a test product description.')).toBeInTheDocument();
  });

  it('renders seller username', () => {
    renderProductCard();
    expect(screen.getByText('test_seller')).toBeInTheDocument();
  });

  it('renders default seller username if not provided', () => {
    renderProductCard({
      seller: {}
    });
    expect(screen.getByText('Anonymous')).toBeInTheDocument();
  });

  it('renders "Buy Now" button for buy now auction type', () => {
    renderProductCard();
    expect(screen.getByText('Buy Now')).toBeInTheDocument();
  });

  it('renders "Bid Now" button for bid auction type', () => {
    renderProductCard({
      auction_type: 'bid'
    });
    expect(screen.getByText('Bid Now')).toBeInTheDocument();
  });

  it('renders product price', () => {
    renderProductCard();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('renders number of bids', () => {
    renderProductCard();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders "New" badge', () => {
    renderProductCard();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders days left', () => {
    renderProductCard();
    expect(screen.getByText(/5 days left/)).toBeInTheDocument();
  });

  it('truncates long description', () => {
    const longDescription = 'This is a very long description that should be truncated at some point to ensure proper display';
    renderProductCard({
      product: {
        ...mockItem.product,
        description: longDescription
      }
    });
    expect(screen.getByText(/\.\.\.$/)).toBeInTheDocument();
  });

  it('renders category navigator', () => {
    renderProductCard();
    expect(screen.getByTestId('category-navigator')).toBeInTheDocument();
  });

  it('renders product image', () => {
    renderProductCard();
    const image = screen.getByAltText('product-image');
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  it('renders seller profile image', () => {
    renderProductCard();
    const image = screen.getByAltText('Seller');
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/40');
  });

  it('renders default seller image if not provided', () => {
    renderProductCard({
      seller: {
        username: 'test_seller'
      }
    });
    const image = screen.getByAltText('Seller');
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/40');
  });
});