import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CategoryPage from '../../Category/CategoryProduct';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

const mockUseParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useParams: () => mockUseParams(),
}));

let filterChangeCallback;
jest.mock('../../FilterSidebar/FilterSidebar', () => ({ onFilterChange }) => {
  filterChangeCallback = onFilterChange;
  return (
    <div data-testid="FilterSidebar">
      <input
        data-testid="price-filter"
        type="range"
        onChange={(e) => onFilterChange('price', e.target.value)}
      />
      <input
        data-testid="status-active-filter"
        type="checkbox"
        onChange={(e) => onFilterChange('status', 'active', e.target.checked)}
      />
    </div>
  );
});
jest.mock('../../CategoryList/CategoryList', () => () => <div data-testid="CategoryList">CategoryList</div>);
jest.mock('../../LoadingSpinner/LoadingSpinner', () => () => <div data-testid="LoadingSpinner">LoadingSpinner</div>);
jest.mock('../../ProductComponent/ProductCardCategoryView', () => ({ product }) => (
  <div data-testid="ProductCardCategoryView">{product.name}</div>
));

describe('CategoryPage Component', () => {
  const mockCategoryData = { data: { name: 'Electronics' } };
  const mockProductData = { data: { auctions: [{ id: '1', name: 'Product 1' }, { id: '2', name: 'Product 2' }] } };

  beforeEach(() => {
    axios.get.mockClear();
    // Ustawienie wartości domyślnej dla useParams przed każdym testem
    mockUseParams.mockReturnValue({ categoryId: '1' });
  });

  test('displays loading spinner while data is loading', async () => {
    axios.get.mockResolvedValueOnce(mockCategoryData).mockResolvedValueOnce(mockProductData);

    render(
      <BrowserRouter>
        <CategoryPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('LoadingSpinner')).toBeInTheDocument();
  });

  test('renders category name and products after fetching data', async () => {
    axios.get.mockResolvedValueOnce(mockCategoryData).mockResolvedValueOnce(mockProductData);

    render(
      <BrowserRouter>
        <CategoryPage />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText(/category -/i)).toBeInTheDocument());
    expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('ProductCardCategoryView')).toHaveLength(2);
  });

  test('displays error message if fetching category fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch category'));

    render(
      <BrowserRouter>
        <CategoryPage />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText(/Failed to fetch category/i)).toBeInTheDocument());
  });
});