import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../HomePage';
import { MemoryRouter } from 'react-router-dom';
import useCategories from '../../../hooks/useCategories';
import useFetchProducts from '../../../hooks/useFetchProducts';
import { useScreenSize } from '../../../hooks/useScreenSize';

jest.mock('../../../hooks/useCategories');
jest.mock('../../../hooks/useFetchProducts');
jest.mock('../../../hooks/useScreenSize');
jest.mock('../../LoadingSpinner/LoadingSpinner', () => jest.fn(() => <div>Loading...</div>));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders LoadingSpinner when categories or products are loading', () => {
  useCategories.mockReturnValue([[], true]);
  useFetchProducts.mockReturnValue([[], true]);
  useScreenSize.mockReturnValue({ screenWidth: 1024 });

  render(<HomePage />, { wrapper: MemoryRouter });
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('renders HomePage with categories and products', () => {
  useCategories.mockReturnValue([[{ id: 1, name: 'Category 1' }], false]);
  useFetchProducts.mockReturnValue([[{ id: 1, name: 'Product 1' }], false]);
  useScreenSize.mockReturnValue({ screenWidth: 1024 });

  render(<HomePage />, { wrapper: MemoryRouter });
  expect(screen.getByText('Join Us in Making a Difference')).toBeInTheDocument();
});

it('navigates to product category page when Start Bidding button is clicked', () => {
  useCategories.mockReturnValue([[{ id: 1, name: 'Category 1' }], false]);
  useFetchProducts.mockReturnValue([[{ id: 1, name: 'Product 1' }], false]);
  useScreenSize.mockReturnValue({ screenWidth: 1024 });

  render(<HomePage />, { wrapper: MemoryRouter });
  fireEvent.click(screen.getByText('Start Bidding'));
  expect(mockNavigate).toHaveBeenCalledWith('/product/category/1');
});

it('navigates to contact page when Contact Us button is clicked', () => {
  useCategories.mockReturnValue([[{ id: 1, name: 'Category 1' }], false]);
  useFetchProducts.mockReturnValue([[{ id: 1, name: 'Product 1' }], false]);
  useScreenSize.mockReturnValue({ screenWidth: 1024 });

  render(<HomePage />, { wrapper: MemoryRouter });
  fireEvent.click(screen.getByText('Contact Us'));
  expect(mockNavigate).toHaveBeenCalledWith('/contact');
});

it('renders MobileCategorySidebar on small screens', () => {
  useCategories.mockReturnValue([[{ id: 1, name: 'Category 1' }], false]);
  useFetchProducts.mockReturnValue([[{ id: 1, name: 'Product 1' }], false]);
  useScreenSize.mockReturnValue({ screenWidth: 500 });

  render(<HomePage />, { wrapper: MemoryRouter });
  expect(screen.getByText('Categories')).toBeInTheDocument();
});