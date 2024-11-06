import React from 'react';
import { render, screen } from '@testing-library/react';
import SuccessPayment from '../SuccessPayment';
import '@testing-library/jest-dom/extend-expect';

describe('SuccessPayment Component', () => {
  it('renders the success message correctly', () => {
    render(<SuccessPayment />);
    expect(screen.getByText('Payment Successful!')).toBeInTheDocument();
    expect(screen.getByText('Your funds have been successfully added to your wallet')).toBeInTheDocument();
  });

  it('renders the confirmation email message correctly', () => {
    render(<SuccessPayment />);
    expect(screen.getByText('You will receive a confirmation email shortly')).toBeInTheDocument();
  });

  it('renders the "Back to bidding!" button correctly', () => {
    render(<SuccessPayment />);
    expect(screen.getByText('Back to bidding!')).toBeInTheDocument();
  });

  it('renders the "View Transactions" button correctly', () => {
    render(<SuccessPayment />);
    expect(screen.getByText('View Transactions')).toBeInTheDocument();
  });

  it('renders the security message correctly', () => {
    render(<SuccessPayment />);
    expect(screen.getByText('Transaction processed securely by Stripe')).toBeInTheDocument();
  });
});