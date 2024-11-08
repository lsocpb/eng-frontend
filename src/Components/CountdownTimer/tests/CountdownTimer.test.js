import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import CountdownTimer from './CountdownTimer';

describe('CountdownTimer', () => {
  test('renders countdown timer correctly', () => {
    const futureDate = new Date(Date.now() + 10000);
    render(<CountdownTimer date={futureDate} />);
    
    expect(screen.getByText(/days/i)).toBeInTheDocument();
    expect(screen.getByText(/hours/i)).toBeInTheDocument();
    expect(screen.getByText(/min/i)).toBeInTheDocument();
    expect(screen.getByText(/sec/i)).toBeInTheDocument();
  });

  test('displays "Auction ended" when completed', () => {
    const pastDate = new Date(Date.now() - 10000);
    render(<CountdownTimer date={pastDate} />);
    
    expect(screen.getByText(/Auction ended/i)).toBeInTheDocument();
  });
});