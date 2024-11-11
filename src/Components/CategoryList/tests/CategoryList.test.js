import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CategoryList from '../CategoryList';

const mockCategories = [
    { id: 1, name: 'Electronics', icon: 'tv' },
    { id: 2, name: 'Books', icon: 'book' },
    { id: 3, name: 'Clothing', icon: 'tshirt' },
];

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('CategoryList Component', () => {
    test('renders CategoryList component', () => {
        render(
            <MemoryRouter>
                <CategoryList allCategories={mockCategories} />
            </MemoryRouter>
        );

        mockCategories.forEach(category => {
            expect(screen.getByText(category.name)).toBeInTheDocument();
        });
    });

    test('navigates to category page on click', () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

        render(
            <MemoryRouter>
                <CategoryList allCategories={mockCategories} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Electronics'));
        expect(navigate).toHaveBeenCalledWith('/product/category/1');
    });

    test('navigates to category page on Enter key press', () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

        render(
            <MemoryRouter>
                <CategoryList allCategories={mockCategories} />
            </MemoryRouter>
        );

        const firstCategory = screen.getByText('Electronics');
        fireEvent.keyDown(firstCategory, { key: 'Enter', code: 'Enter' });
        expect(navigate).toHaveBeenCalledWith('/product/category/1');
    });
});