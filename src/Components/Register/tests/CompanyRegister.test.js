import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CompanyRegister from '../CompanyRegister';
import { showErrorToast } from "../../ToastNotifications/ToastNotifications";
import axios from 'axios';

jest.mock('axios');
jest.mock("../..//ToastNotifications/ToastNotifications", () => ({
    showErrorToast: jest.fn()
}));
jest.mock("../../AuthRedirect/withAuthRedirect", () => (component) => component);

describe('CompanyRegister Component', () => {
    beforeEach(() => {
        axios.post.mockReset();
        showErrorToast.mockReset();
    });

    test('renders form fields and submit button', () => {
        render(<CompanyRegister />);

        // Check for form field labels
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Tax ID \(REGON\)/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Bank Account/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Street Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/State\/Province/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();

        // Check for submit button
        expect(screen.getByRole('button', { name: /Register Company/i })).toBeInTheDocument();
    });

    test('shows error messages when required fields are missing', async () => {
        render(<CompanyRegister />);

        // Trigger form validation
        fireEvent.click(screen.getByRole('button', { name: /Register Company/i }));

        await waitFor(() => {
            // Check for validation error messages
            expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
        });
    });

    test('shows error toast on registration failure', async () => {
        axios.post = jest.fn().mockRejectedValueOnce({ response: { data: { detail: 'Registration failed' } } });
        render(<CompanyRegister />);

        // Fill out the form
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/Company Name/i), { target: { value: 'Test Company' } });
        fireEvent.change(screen.getByLabelText(/Tax ID \(REGON\)/i), { target: { value: '123456789' } });
        fireEvent.change(screen.getByLabelText(/Bank Account/i), { target: { value: '1234567890123456' } });
        fireEvent.change(screen.getByLabelText(/Street Address/i), { target: { value: '123 Test St' } });
        fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Test City' } });
        fireEvent.change(screen.getByLabelText(/State\/Province/i), { target: { value: 'Test State' } });
        fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: '12345' } });
        fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: 'Poland' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '123456789' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Register Company/i }));

        // Check for the error toast
        await waitFor(() => {
            expect(showErrorToast).toHaveBeenCalledWith('Registration failed');
        });
    });
});
