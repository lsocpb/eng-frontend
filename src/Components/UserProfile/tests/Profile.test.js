import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfilePage from '../Profile';
import axios from 'axios';
import { useUser } from '../../UserContext/UserContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

jest.mock('axios');
jest.mock('../../UserContext/UserContext');
jest.mock('js-cookie', () => ({
  get: jest.fn()
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('ProfilePage', () => {
  const mockLogout = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useUser.mockReturnValue({ logout: mockLogout });
    useNavigate.mockReturnValue(mockNavigate);
    Cookies.get.mockReturnValue('test-jwt-token');
  });

  it('displays profile data after successful API call', async () => {
    const mockProfileData = {
      username: 'testUser',
      profile_image_url: 'https://example.com/profile.jpg',
      role: 'admin',
      email: 'testuser@example.com'
    };
    const mockBillingData = {
      address: '123 Test St',
      city: 'Test City',
      postal_code: '12345'
    };

    axios.get.mockResolvedValueOnce({
      data: { ...mockProfileData, billing: mockBillingData }
    });

    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText('Full Name')).toBeInTheDocument();
      expect(screen.getByText('testuser@example.com')).toBeInTheDocument();
      expect(screen.getByText('123 Test St')).toBeInTheDocument();
      expect(screen.getByText('Test City')).toBeInTheDocument();
      expect(screen.getByText('12345')).toBeInTheDocument();
    });
  });

  it('calls logout when logout button is clicked', async () => {
    const mockProfileData = {
      username: 'testUser',
      profile_image_url: 'https://example.com/profile.jpg',
      role: 'admin',
      email: 'testuser@example.com'
    };
    const mockBillingData = {
      address: '123 Test St',
      city: 'Test City',
      postal_code: '12345'
    };

    axios.get.mockResolvedValueOnce({
      data: { ...mockProfileData, billing: mockBillingData }
    });

    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('navigates to admin page when admin button is clicked', async () => {
    const mockProfileData = {
      username: 'testUser',
      profile_image_url: 'https://example.com/profile.jpg',
      role: 'admin',
      email: 'testuser@example.com'
    };
    const mockBillingData = {
      address: '123 Test St',
      city: 'Test City',
      postal_code: '12345'
    };

    axios.get.mockResolvedValueOnce({
      data: { ...mockProfileData, billing: mockBillingData }
    });

    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /admin/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /admin/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/admin');
  });
});
