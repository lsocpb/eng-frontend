import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UnAuthorizedNavbar from '../UnAuthorizedNavbar';

it('renders UnAuthorizedNavbar component', () => {
  render(<UnAuthorizedNavbar />);
  expect(screen.getByAltText('CharFair logo')).toBeInTheDocument();
});

it('renders Register button with correct link', () => {
  render(<UnAuthorizedNavbar />);
  const registerButton = screen.getByRole('button', { name: /register/i });
  expect(registerButton).toBeInTheDocument();
  expect(registerButton.closest('a')).toHaveAttribute('href', '/register');
});

it('renders Login button with correct link', () => {
  render(<UnAuthorizedNavbar />);
  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeInTheDocument();
  expect(loginButton.closest('a')).toHaveAttribute('href', '/login');
});