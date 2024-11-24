import { render, screen, fireEvent } from '@testing-library/react';
import PaymentPage from '../PaymentPage';
import Cookies from 'js-cookie';

jest.mock('axios');
jest.mock('js-cookie');

beforeEach(() => {
  Cookies.get.mockReturnValue('mock-token');
});

it('renders predefined amount buttons', () => {
  render(<PaymentPage />);
  expect(screen.getByText('50 PLN')).toBeInTheDocument();
  expect(screen.getByText('100 PLN')).toBeInTheDocument();
  expect(screen.getByText('200 PLN')).toBeInTheDocument();
  expect(screen.getByText('500 PLN')).toBeInTheDocument();
});

it('selects predefined amount and clears error', () => {
  render(<PaymentPage />);
  fireEvent.click(screen.getByText('100 PLN'));
  expect(screen.getByDisplayValue('100')).toBeInTheDocument();
  expect(screen.queryByText('Minimal amount to top up is 10 PLN')).not.toBeInTheDocument();
});

it('accepts custom amount input within range', () => {
  render(<PaymentPage />);
  fireEvent.change(screen.getByLabelText('Own amount (PLN)'), { target: { value: '150' } });
  expect(screen.getByDisplayValue('150')).toBeInTheDocument();
});


it('shows error for custom amount above maximum', () => {
  render(<PaymentPage />);
  fireEvent.change(screen.getByLabelText('Own amount (PLN)'), { target: { value: '15000' } });
  expect(screen.queryByDisplayValue('15000')).not.toBeInTheDocument();
});