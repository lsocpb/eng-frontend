import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AboutUs from '../AboutUs';

describe('AboutUs Component', () => {
    test('renders What we do section', () => {
        render(<AboutUs />);
        expect(screen.getByText('What we do')).toBeInTheDocument();
        expect(screen.getByText(/CharFair is an online auction platform/i)).toBeInTheDocument();
    });

    test('renders Meet Our Team section', () => {
        render(<AboutUs />);
        expect(screen.getByText('Meet Our Team')).toBeInTheDocument();
    });

    test('renders team members', () => {
        render(<AboutUs />);
        expect(screen.getByText('Mateusz')).toBeInTheDocument();
        expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
        expect(screen.getByText('Łukasz')).toBeInTheDocument();
        expect(screen.getByText('Fullstack Engineer')).toBeInTheDocument();
    });

    test('renders team members descriptions', () => {
        render(<AboutUs />);
        expect(screen.getByText(/Specializing in robust backend architectures/i)).toBeInTheDocument();
        expect(screen.getByText(/Expert in both frontend and backend development/i)).toBeInTheDocument();
    });

    test('renders team members social links', () => {
        render(<AboutUs />);
        expect(screen.getAllByRole('link', { name: /linkedin|github/i }).length).toBeGreaterThan(0);
    });
});