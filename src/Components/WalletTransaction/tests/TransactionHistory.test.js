import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Cookies from 'js-cookie';
import {MemoryRouter, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import TransactionHistory from '../TransactionHistory';

jest.mock('axios');
jest.mock('js-cookie');

describe('TransactionHistory component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('displays loading spinner initially', async () => {
        axios.get.mockResolvedValueOnce({data: {transactions: []}});
        render(<TransactionHistory/>, {wrapper: MemoryRouter});

        expect(screen.getByRole('status')).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
    });

    test('displays an error message if fetch fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));
        render(<TransactionHistory/>, {wrapper: MemoryRouter});

        await waitFor(() => expect(screen.getByText(/failed to load transaction history/i)).toBeInTheDocument());
    });

    test('displays transaction data correctly', async () => {
        Cookies.get.mockReturnValue('fake-token');
        axios.get = jest.fn().mockResolvedValueOnce({
            data: {
                transactions: [
                    {
                        uuid: '1',
                        created_at: '2024-10-05T14:48:00.000Z',
                        amount: 150.0,
                        transaction_status: 'success',
                        receipt_url: 'https://example.com/receipt1'
                    },
                    {
                        uuid: '2',
                        created_at: '2024-10-04T10:30:00.000Z',
                        amount: -50.0,
                        transaction_status: 'expired',
                        receipt_url: ''
                    }
                ]
            }
        });

        render(<TransactionHistory/>, {wrapper: MemoryRouter});

        await waitFor(() => expect(screen.getByText(/transaction history/i)).toBeInTheDocument());

        expect(screen.getByText(/\$150\.00/)).toBeInTheDocument();
        expect(screen.getByText(/\$50\.00/)).toBeInTheDocument();

        expect(screen.getByText('Success')).toBeInTheDocument();
        expect(screen.getByText('Expired')).toBeInTheDocument();

        const receiptLinks = screen.getAllByRole('link', {name: /receipt/i});
        expect(receiptLinks).toHaveLength(1);
        expect(receiptLinks[0]).toHaveAttribute('href', 'https://example.com/receipt1');
    });


    test('displays "No transactions found" when there are no transactions', async () => {
        axios.get.mockResolvedValueOnce({data: {transactions: []}});
        render(<TransactionHistory/>, {wrapper: MemoryRouter});

        await waitFor(() => expect(screen.getByText(/no transactions found/i)).toBeInTheDocument());
    });

    test('navigates to add funds page on button click', async () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <TransactionHistory/>
            </Router>
        );

        const addButton = screen.getByRole('button', {name: /add funds/i});
        userEvent.click(addButton);

        await waitFor(() => expect(history.location.pathname).toBe('/wallet/add-funds'));
    });
});
