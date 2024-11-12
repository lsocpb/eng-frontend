import { render, screen, fireEvent } from '@testing-library/react';
import FilterSidebar from '../FilterSidebar';

describe('FilterSidebar', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders FilterSidebar component', () => {
    render(<FilterSidebar onFilterChange={mockOnFilterChange} margin="m-3" />);
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('calls onFilterChange with correct price value', () => {
    render(<FilterSidebar onFilterChange={mockOnFilterChange} margin="m-3" />);
    const priceRange = screen.getByLabelText('Price');
    fireEvent.change(priceRange, { target: { value: '500000' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith('price', '500000');
  });

  it('calls onFilterChange with correct status value when Active is checked', () => {
    render(<FilterSidebar onFilterChange={mockOnFilterChange} margin="m-3" />);
    const statusActive = screen.getByLabelText('Active');
    fireEvent.click(statusActive);
    expect(mockOnFilterChange).toHaveBeenCalledWith('status', 'active', true);
  });

  it('calls onFilterChange with correct status value when Ended is checked', () => {
    render(<FilterSidebar onFilterChange={mockOnFilterChange} margin="m-3" />);
    const statusInactive = screen.getByLabelText('Ended');
    fireEvent.click(statusInactive);
    expect(mockOnFilterChange).toHaveBeenCalledWith('status', 'inactive', true);
  });

  it('calls onFilterChange with correct status value when Active is unchecked', () => {
    render(<FilterSidebar onFilterChange={mockOnFilterChange} margin="m-3" />);
    const statusActive = screen.getByLabelText('Active');
    fireEvent.click(statusActive);
    fireEvent.click(statusActive);
    expect(mockOnFilterChange).toHaveBeenCalledWith('status', 'active', false);
  });

  it('calls onFilterChange with correct status value when Ended is unchecked', () => {
    render(<FilterSidebar onFilterChange={mockOnFilterChange} margin="m-3" />);
    const statusInactive = screen.getByLabelText('Ended');
    fireEvent.click(statusInactive);
    fireEvent.click(statusInactive);
    expect(mockOnFilterChange).toHaveBeenCalledWith('status', 'inactive', false);
  });
});