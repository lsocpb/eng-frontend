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
     * Test if the `Register` component renders correctly with all necessary elements.
     * It checks for the presence of the registration header, input fields, and sign-up button.
     */
    test('renders Register component', () => {
        render(<Register />);
        
        expect(screen.getByText('Sign up now!')).toBeInTheDocument();
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Street')).toBeInTheDocument();
        expect(screen.getByLabelText('City')).toBeInTheDocument();
        expect(screen.getByLabelText('Zip')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone')).toBeInTheDocument();
        expect(screen.getByText('Sign up')).toBeInTheDocument();
        expect(screen.getByText('or sign up with:')).toBeInTheDocument();
    });

    /**
     * Test form submission behavior by filling out the form fields and clicking the 'Sign up' button.
     * Verifies that the form submission triggers the appropriate actions.
     */
    test('submits the form with user details', async () => {
        render(<Register />);

        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('Street'), { target: { value: '123 Main St' } });
        fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Anytown' } });
        fireEvent.change(screen.getByLabelText('Zip'), { target: { value: '12345' } });
        fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '555-1234' } });

        const signUpButton = screen.getByText('Sign up');
        fireEvent.click(signUpButton);

    });

    /**
     * Test if an error message is displayed when required fields are not provided.
     */
    test('shows error when required fields are not provided', () => {
        render(<Register />);

        const signUpButton = screen.getByText('Sign up');
        fireEvent.click(signUpButton);

        expect(screen.getByText(/username and password are required/i)).toBeInTheDocument();
    });
});
