import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from '../Register';
import {MemoryRouter, Route, Routes} from "react-router-dom";

/**
 * Mock the `withAuthRedirect` HOC used in the `Register` component.
 */
jest.mock('../../AuthRedirect/withAuthRedirect', () => (component) => component);

/**
 * Test suite for the `Register` component.
 */
describe('Register Component', () => {
    /**
     * Test if the `Register` component renders correctly.
     */
    test('renders Register component', () => {
        render(
            <MemoryRouter>
                <Register/>
            </MemoryRouter>
        );

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
        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/register/user" element={<div>Personal Account Registration</div>}/>
                </Routes>
            </MemoryRouter>
        );

        const registerButton = screen.getByText(/register personal account/i);
        fireEvent.click(registerButton);
        expect(screen.getByText('Personal Account Registration')).toBeInTheDocument();
    });

    test('redirects to /register/company when the "Register Company Account" button is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/register/company" element={<div>Register Business Account</div>}/>
                </Routes>
            </MemoryRouter>
        );

        const registerButton = screen.getByText(/register business account/i);
        fireEvent.click(registerButton);
        expect(screen.getByText('Register Business Account')).toBeInTheDocument();
    });
});