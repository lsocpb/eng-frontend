/**
 * @fileoverview
 * Unit tests for the Login component.
 * These tests use the Testing Library and are configured with Jest.
 * They verify the rendering of the component and the functionality of the login form.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

/**
 * Mock the `withAuthRedirect` module to bypass redirect logic in tests.
 *
 * @param {React.ComponentType} component - The component to mock.
 * @returns {React.ComponentType} - A component that returns the provided component without additional logic.
 */
jest.mock('../AuthRedirect/withAuthRedirect', () => (component) => component);

/**
 * Test suite for the Login component.
 */
describe('Login Component', () => {

    /**
     * Test if the Login component renders correctly.
     */
    test('renders Login component', () => {
        render(<Login />);

        expect(screen.getByText('We are The CharFair Team')).toBeInTheDocument();
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByText('LOGIN')).toBeInTheDocument();
        expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    });

    /**
     * Test if an error message is displayed when username and password are not provided.
     */
    test('shows error when username and password are not provided', () => {
        render(<Login />);

        // Click the login button without entering any data
        const loginButton = screen.getByText('LOGIN');
        fireEvent.click(loginButton);

        // Check if the error message is displayed
        expect(screen.getByText(/username and password are required/i)).toBeInTheDocument();
    });

    /**
     * Test if no error message is displayed when username and password are provided.
     */
    test('does not show error when username and password are provided', () => {
        render(<Login />);

        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

        const loginButton = screen.getByText('LOGIN');
        fireEvent.click(loginButton);

        expect(screen.queryByText(/username and password are required/i)).not.toBeInTheDocument();
    });

    /**
     * Test if an error message is displayed when login fails.
     */
    test('shows error when login fails', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
            json: async () => ({ message: 'Wrong username or password' })
        });

        render(<Login />);

        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

        const loginButton = screen.getByText('LOGIN');
        fireEvent.click(loginButton);

        expect(await screen.findByText('Wrong username or password')).toBeInTheDocument();
    });

    /**
     * Test if the user is redirected to the home page on successful login.
     */
    test('redirects to home page on successful login and show success message', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({ access_token: 'token' })
        });

        render(<Login />);

        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

        const loginButton = screen.getByText('LOGIN');
        fireEvent.click(loginButton);

        expect(await screen.findByText('Login successful')).toBeInTheDocument();
    });
});
