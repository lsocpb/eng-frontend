import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserProvider, useUser } from '../UserContext';
import  {jwtDecode} from "jwt-decode"

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  remove: jest.fn(),
}));

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('UserProvider', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  const TestComponent = () => {
    const { user, logout } = useUser();
    return (
      <div>
        <p data-testid="username">{user?.username || 'No user'}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  };

  test('sets user state based on decoded token from cookie', async () => {
    const mockToken = 'mockToken';
    const mockUserData = { sub: 'testuser', id: 123, role: 'user' };


    Cookies.get.mockReturnValue(mockToken);
    jwtDecode.mockReturnValue(mockUserData);

    await act(async () => {
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      );
    });

    expect(Cookies.get).toHaveBeenCalledWith('active-user');
    expect(jwtDecode).toHaveBeenCalledWith(mockToken);
    await waitFor(() => expect(screen.getByTestId('username')).toHaveTextContent('testuser'));
  });

  test('sets user to null if no token is found', async () => {
    Cookies.get.mockReturnValue(null);

    await act(async () => {
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      );
    });

    await waitFor(() => expect(screen.getByTestId('username')).toHaveTextContent('No user'));
  });

  test('logout function clears user, removes cookie, and navigates to login', async () => {
    const mockToken = 'mockToken';
    const mockUserData = { sub: 'testuser', id: 123, role: 'user' };

    Cookies.get.mockReturnValue(mockToken);
    jwtDecode.mockReturnValue(mockUserData);

    await act(async () => {
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      );
    });

    // Simulate clicking logout
    act(() => {
      screen.getByText('Logout').click();
    });

    expect(Cookies.remove).toHaveBeenCalledWith('active-user');
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    await waitFor(() => expect(screen.getByTestId('username')).toHaveTextContent('No user'));
  });
});
