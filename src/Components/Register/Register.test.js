import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from './Register';

/**
 * Mock the `withAuthRedirect` HOC used in the `Register` component.
 */
jest.mock('../AuthRedirect/withAuthRedirect', () => (component) => component);

/**
 * Test suite for the `Register` component.
 */
describe('Register Component', () => {
    /**
     * Test if the `Register` component renders correctly.
     */
    test('renders Register component', () => {
        render(<Register />);

        expect(screen.getByText('Choose Registration Type')).toBeInTheDocument();
        expect(screen.getByText('Select the type of account that best suits your needs')).toBeInTheDocument();
        expect(screen.getByText('Personal Account')).toBeInTheDocument();
        expect(screen.getByText('Perfect for individual users who want to:')).toBeInTheDocument();
        expect(screen.getByText('Quick registration with basic information')).toBeInTheDocument();
        expect(screen.getByText('Register Personal Account')).toBeInTheDocument();
    });

    /**
     * Test if the user is redirected to the correct registration page when the 'Register Personal Account' button is clicked.
     */
    test('redirects to /register/user when the "Register Personal Account" button is clicked', () => {
        render(<Register />);

        const registerButton = screen.getByText('Register Personal Account');
        fireEvent.click(registerButton);

        expect(screen.getByText('Personal Account Registration')).toBeInTheDocument();
    });
});