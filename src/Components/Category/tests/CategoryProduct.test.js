import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CategoryPage from '../CategoryProduct';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('CategoryPage', () => {
    const mockCategories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
    ];

    const mockProducts = [
        { id: 1, name: 'Product 1', price: 100, is_auction_finished: false },
        { id: 2, name: 'Product 2', price: 200, is_auction_finished: true },
    ];

    beforeEach(() => {
        axios.get.mockImplementation((url) => {
            if (url.includes('/category/id/')) {
                return Promise.resolve({ data: { name: 'Mock Category' } });
            }
            if (url.includes('/auction/category/')) {
                return Promise.resolve({ data: { auctions: mockProducts } });
            }
            return Promise.reject(new Error('not found'));
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading spinner initially', async () => {
        await act(async () => {
            render(
                <Router>
                    <CategoryPage />
                </Router>
            );
        });

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('renders category name and products after loading', async () => {
        await act(async () => {
            render(
                <Router>
                    <CategoryPage />
                </Router>
            );
        });

        await waitFor(() => {
            expect(screen.getByText(/category -/i)).toBeInTheDocument();
            expect(screen.getByText(/mock category/i)).toBeInTheDocument();
            expect(screen.getByText(/product 1/i)).toBeInTheDocument();
            expect(screen.getByText(/product 2/i)).toBeInTheDocument();
        });
    });

    test('renders error message on fetch failure', async () => {
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

        await act(async () => {
            render(
                <Router>
                    <CategoryPage />
                </Router>
            );
        });

        await waitFor(() => {
            expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
        });
    });

    test('renders no products message when no products found', async () => {
        axios.get.mockImplementation((url) => {
            if (url.includes('/auction/category/')) {
                return Promise.resolve({ data: { auctions: [] } });
            }
            return Promise.reject(new Error('not found'));
        });

        await act(async () => {
            render(
                <Router>
                    <CategoryPage />
                </Router>
            );
        });

        await waitFor(() => {
            expect(screen.getByText(/no products found with current filters/i)).toBeInTheDocument();
        });
    });
});