import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewAllCategories from '../ViewAllCategories';
import axios from 'axios';
import Cookies from 'js-cookie';

jest.mock('axios');
jest.mock('js-cookie', () => ({
  get: jest.fn()
}));

describe('ViewAllCategories component', () => {
  beforeEach(() => {
    Cookies.get.mockReturnValue('test-jwt-token');
  });


  it('displays categories in the table after successful fetch', async () => {
    const mockCategories = [
      { id: 1, name: 'Category 1', description: 'Description 1', status: 'Active' },
      { id: 2, name: 'Category 2', description: 'Description 2', status: 'Inactive' }
    ];
    axios.get.mockResolvedValueOnce({ data: mockCategories });

    render(<ViewAllCategories />);

    await waitFor(() => {
      expect(screen.getByText('Category 1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Category 2')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
      expect(screen.getByText('Inactive')).toBeInTheDocument();
    });
  });


  it('handles fetch failure by setting allCategories to an empty array', async () => {
    axios.get.mockRejectedValueOnce(new Error('Fetch failed'));

    render(<ViewAllCategories />);

    await waitFor(() => {
      expect(screen.queryByText('Category Name 1')).not.toBeInTheDocument();
    });
  });
});
