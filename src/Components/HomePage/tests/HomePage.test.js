import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';
import useCategories from '../../../hooks/useCategories';
import useFetchProducts from '../../../hooks/useFetchProducts';
import { useScreenSize } from '../../../hooks/useScreenSize';

jest.mock('../../../hooks/useCategories');
jest.mock('../../../hooks/useFetchProducts');
jest.mock('../../../hooks/useScreenSize');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

// Mock Slider component
jest.mock('react-slick', () => {
  return function MockSlider({ children }) {
    return <div data-testid="mock-slider">{children}</div>;
  };
});

jest.mock('../../LoadingSpinner/LoadingSpinner', () => () => <div data-testid="LoadingSpinner">LoadingSpinner</div>);
jest.mock('../../CategoryList/CategoryList', () => () => <div data-testid="category-list">CategoryList</div>);
jest.mock('../../MobileCategoryList/MobileCategoryList', () => () => <div data-testid="mobile-category-sidebar">MobileCategorySidebar</div>);
const mockCategories = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' }
];

const mockProducts = [
  {
    id: 1,
    product: {
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      image_url_1: 'image1.jpg'
    },
    auction_type: 'bid_now',
    days_left: 5,
    category: { category_id: 1 },
    seller: { profile_image_url: 'seller1.jpg', username: 'Seller 1' },
    bid_count: 3
  },
  {
    id: 2,
    product: {
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      image_url_1: 'image2.jpg'
    },
    auction_type: 'buy_now',
    days_left: 7,
    category: { category_id: 2 },
    seller: { profile_image_url: 'seller2.jpg', username: 'Seller 2' },
    bid_count: 5
  }
];


describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useCategories.mockReturnValue([mockCategories, false]);
    useFetchProducts.mockReturnValue([mockProducts, false]);
    useScreenSize.mockReturnValue({ screenWidth: 1200 });
  });

  test('renders loading spinner when data is being fetched', () => {
    useCategories.mockReturnValue([[], true]);
    useFetchProducts.mockReturnValue([[], true]);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('LoadingSpinner')).toBeInTheDocument();
  });

  test('renders CategoryList on desktop view', () => {
    useScreenSize.mockReturnValue({ screenWidth: 1200 });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('category-list')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-category-sidebar')).not.toBeInTheDocument();
  });

  test('renders MobileCategorySidebar on mobile view', () => {
    useScreenSize.mockReturnValue({ screenWidth: 480 });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('mobile-category-sidebar')).toBeInTheDocument();
    expect(screen.queryByTestId('category-list')).not.toBeInTheDocument();
  });

  test('renders main content sections', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Check for main headings
    expect(screen.getByText('Join Us in Making a Difference')).toBeInTheDocument();
    expect(screen.getByText('Welcome to Our Charity Auction!')).toBeInTheDocument();
    expect(screen.getByText('Become Our Partner')).toBeInTheDocument();
    expect(screen.getByText('Last Auctions')).toBeInTheDocument();
  });

  test('handles View All Auctions button click', () => {
    const navigateMock = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigateMock);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const viewAllButtons = screen.getAllByText('View All Auctions');
    fireEvent.click(viewAllButtons[0]);

    expect(navigateMock).toHaveBeenCalledWith('/product/category/1');
  });

  test('handles Contact Us button click', () => {
    const navigateMock = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigateMock);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const contactButton = screen.getByText('Contact Us');
    fireEvent.click(contactButton);

    expect(navigateMock).toHaveBeenCalledWith('/contact');
  });

  test('renders carousel images', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const carouselImages = screen.getAllByAltText('Charity Bidding Platform');
    expect(carouselImages).toHaveLength(2);
    carouselImages.forEach(image => {
      expect(image).toBeInTheDocument();
    });
  });

  test('displays charity impact icons and text', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const impactTexts = [
      'Support Great Causes',
      'Safe & Easy Access',
      'Global Community'
    ];

    impactTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  test('displays 100% proceeds message', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const proceedsText = screen.getAllByText(/100% of proceeds go directly to our partner charities/i);
    expect(proceedsText.length).toBeGreaterThan(0);
  });
});