import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AuctionReport from "../AuctionRaport";

jest.mock('axios');

describe('AuctionReport', () => {
    const mockStats = {
        participants_count: 10,
        total_bids: 50,
        highest_bid: 100.5,
        lowest_bid: 10.0,
    };


    it('renders auction statistics after fetching data', async () => {
        axios.get.mockResolvedValueOnce({ data: mockStats });

        render(
            <MemoryRouter initialEntries={['/auction/1']}>
                <Routes>
                    <Route path="/auction/:auctionId" element={<AuctionReport />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Total Participants')).toBeInTheDocument();
        });
        expect(screen.getByText('10')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Total Bids')).toBeInTheDocument();
        });
        expect(screen.getByText('50')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Highest Bid')).toBeInTheDocument();
        });
        expect(screen.getByText('$100.50')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Lowest Bid')).toBeInTheDocument();
        });
        expect(screen.getByText('$10.00')).toBeInTheDocument();
    });

    it('renders error message on fetch failure', async () => {
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(
            <MemoryRouter initialEntries={['/auction/1']}>
                <Routes>
                    <Route path="/auction/:auctionId" element={<AuctionReport />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Failed to fetch auction statistics')).toBeInTheDocument();
        });
    });
});