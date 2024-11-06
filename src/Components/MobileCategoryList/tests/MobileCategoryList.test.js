import { render, screen, fireEvent } from '@testing-library/react';
import MobileCategorySidebar from '../MobileCategoryList';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const categories = [
  { id: 1, name: 'Category 1', icon: 'icon-1' },
  { id: 2, name: 'Category 2', icon: 'icon-2' },
];

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders MobileCategorySidebar with categories', () => {
  render(<MobileCategorySidebar allCategories={categories} />, { wrapper: MemoryRouter });
  expect(screen.getByText('Categories')).toBeInTheDocument();
  expect(screen.getByText('Category 1')).toBeInTheDocument();
  expect(screen.getByText('Category 2')).toBeInTheDocument();
});

it('toggles sidebar visibility when toggle button is clicked', () => {
  render(<MobileCategorySidebar allCategories={categories} />, { wrapper: MemoryRouter });
  const toggleButton = screen.getByLabelText('Toggle category menu');
  fireEvent.click(toggleButton);
  expect(document.body.classList.contains('overflow-hidden')).toBe(true);
  fireEvent.click(toggleButton);
  expect(document.body.classList.contains('overflow-hidden')).toBe(false);
});

it('navigates to category page when category is clicked', () => {
  render(<MobileCategorySidebar allCategories={categories} />, { wrapper: MemoryRouter });
  fireEvent.click(screen.getByText('Category 1'));
  expect(mockNavigate).toHaveBeenCalledWith('/product/category/1');
});

it('closes sidebar when clicking outside', () => {
  render(<MobileCategorySidebar allCategories={categories} />, { wrapper: MemoryRouter });
  fireEvent.mouseDown(document);
  expect(document.body.classList.contains('overflow-hidden')).toBe(false);
});