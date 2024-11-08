import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';

describe('Footer Component', () => {
    test('renders social media buttons', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByRole('button', { name: /facebook/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /twitter/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /instagram/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /linkedin/i })).toBeInTheDocument();
    });

    test('renders quick links', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByText(/about us/i)).toBeInTheDocument();
        expect(screen.getByText(/success stories/i)).toBeInTheDocument();
        expect(screen.getByText(/faqs/i)).toBeInTheDocument();
    });

    test('renders contact information', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByText(/wiejska 8, bialystok, poland/i)).toBeInTheDocument();
        expect(screen.getByText(/charfaircharity@gmail.com/i)).toBeInTheDocument();
        expect(screen.getByText(/\+ 01 234 567 88/i)).toBeInTheDocument();
    });

    test('navigates to correct pages on link click', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/about us/i));
        expect(window.location.pathname).toBe('/aboutus');

        fireEvent.click(screen.getByText(/success stories/i));
        expect(window.location.pathname).toBe('/stories');

        fireEvent.click(screen.getByText(/faqs/i));
        expect(window.location.pathname).toBe('/FAQ');
    });

    test('renders copyright information', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByText(/© 2024 copyright:/i)).toBeInTheDocument();
        expect(screen.getByText(/charfair/i)).toBeInTheDocument();
        expect(screen.getByText(/privacy policy/i)).toBeInTheDocument();
        expect(screen.getByText(/terms of service/i)).toBeInTheDocument();
    });
});