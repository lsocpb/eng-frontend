import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FailurePayment from '../../FaliurePayment/FaliurePayment';

describe('FailurePayment Component', () => {
  it('renders the failure message', () => {
    render(<FailurePayment />);
    expect(screen.getByText("Payment Failed")).toBeInTheDocument();
  });

  it('renders the retry message', () => {
    render(<FailurePayment />);
    expect(screen.getByText("We couldn't process your payment. Please try again.")).toBeInTheDocument();
  });

  it('renders the common reasons for failure', () => {
    render(<FailurePayment />);
    expect(screen.getByText("Common reasons for failure:")).toBeInTheDocument();
    expect(screen.getByText("Insufficient funds")).toBeInTheDocument();
    expect(screen.getByText("Invalid card details")).toBeInTheDocument();
    expect(screen.getByText("Transaction declined by bank")).toBeInTheDocument();
    expect(screen.getByText("Network connection issues")).toBeInTheDocument();
  });
});