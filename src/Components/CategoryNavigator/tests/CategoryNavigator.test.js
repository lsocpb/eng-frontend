import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import CategoryNavigator from '../CategoryNavigator';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useParams: () => ({ sellerId: '1', sellerName: 'JohnDoe' }),
}));

describe('CategoryNavigator', () => {
    const navigate = useNavigate();

    beforeEach(() => {
        navigate.mockReset();
    });

    it('should navigate to the correct category page when clicked', () => {
        const category = { item: { id: '123', name: 'Electronics' } };
        const { getByText } = render(
            <MemoryRouter>
                <CategoryNavigator {...category} />
            </MemoryRouter>
        );

        fireEvent.click(getByText('Electronics'));

        expect(navigate).toHaveBeenCalledWith(
            '/product/seller/1/JohnDoe/category/123/Electronics',
            { state: { id: '1', firstName: 'JohnDoe' } }
        );
    });

    it('should navigate to the category page without seller info if sellerId is 0', () => {
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useParams: () => ({ sellerId: '0', sellerName: '' }),
        }));

        const category = { item: { id: '123', name: 'Electronics' } };
        const { getByText } = render(
            <MemoryRouter>
                <CategoryNavigator {...category} />
            </MemoryRouter>
        );

        fireEvent.click(getByText('Electronics'));

        expect(navigate).toHaveBeenCalledWith('/product/category/123/Electronics');
    });
});