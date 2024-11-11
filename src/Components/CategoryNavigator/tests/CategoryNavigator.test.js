import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryNavigator from '../CategoryNavigator';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('CategoryNavigator', () => {
  const mockNavigate = jest.fn();
  const mockCategory = { item: { id: 1, name: 'Electronics' } };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders category name correctly', () => {
    useParams.mockReturnValue({ sellerId: null, sellerName: null });

    render(<CategoryNavigator category={mockCategory} />);

    expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
  });

  test('navigates to seller category page if sellerId is present', () => {
    useParams.mockReturnValue({ sellerId: '123', sellerName: 'SellerName' });

    render(<CategoryNavigator category={mockCategory} />);

    fireEvent.click(screen.getByText(/Electronics/i));

    expect(mockNavigate).toHaveBeenCalledWith(
      '/product/seller/123/SellerName/category/1/Electronics',
      { state: { id: '123', firstName: 'SellerName' } }
    );
  });

  test('navigates to general category page if sellerId is not present', () => {
    useParams.mockReturnValue({ sellerId: null, sellerName: null });

    render(<CategoryNavigator category={mockCategory} />);

    fireEvent.click(screen.getByText(/Electronics/i));

    expect(mockNavigate).toHaveBeenCalledWith('/product/category/1/Electronics');
  });
});
