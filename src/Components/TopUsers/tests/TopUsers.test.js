import { render, screen } from '@testing-library/react';
import TopUsers from '../TopUsers';
import '@testing-library/jest-dom';

describe('TopUsers Component', () => {
    test('renders the Top Users card', () => {
        render(<TopUsers />);

        const cardTitle = screen.getByText(/Top Users/i);
        expect(cardTitle).toBeInTheDocument();
    });

    test('displays the correct list of users with their auction and bid counts', () => {
        render(<TopUsers />);

        const userNames = screen.getAllByText(/Doe|Smith|Johnson/);
        expect(userNames).toHaveLength(3);

        expect(screen.getByText(/15 auctions/)).toBeInTheDocument();
        expect(screen.getByText(/45 bids/)).toBeInTheDocument();
        expect(screen.getByText(/12 auctions/)).toBeInTheDocument();
        expect(screen.getByText(/38 bids/)).toBeInTheDocument();
        expect(screen.getByText(/10 auctions/)).toBeInTheDocument();
        expect(screen.getByText(/30 bids/)).toBeInTheDocument();
    });

    test('renders the correct number of list items', () => {
        render(<TopUsers />);

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(3);
    });

});
