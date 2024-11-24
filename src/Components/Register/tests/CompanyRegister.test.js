import React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import axios from 'axios';
import CompanyRegister from '../CompanyRegister';
import {showErrorToast} from '../../ToastNotifications/ToastNotifications';
import {MemoryRouter} from "react-router-dom";

jest.mock('axios');
jest.mock('../../ToastNotifications/ToastNotifications');
jest.mock('js-cookie');

describe('CompanyRegister Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('submits the form successfully and shows confirmation', async () => {
        axios.post.mockResolvedValueOnce({data: {success: true}});

        render(<CompanyRegister/>, {wrapper: MemoryRouter});

        fireEvent.change(screen.getByLabelText('Username *'), {target: {value: 'testuser'}});
        fireEvent.change(screen.getByLabelText('Email *'), {target: {value: 'test@example.com'}});
        fireEvent.change(screen.getByLabelText('Hasło *'), {target: {value: 'password123'}});
        fireEvent.change(screen.getByLabelText('Company Name'), {target: {value: 'Test Company'}});
        fireEvent.change(screen.getByLabelText('Tax ID (REGON)'), {target: {value: '123456789'}});
        fireEvent.change(screen.getByLabelText('Bank Account'), {target: {value: '12345678901234567890123456'}});
        fireEvent.change(screen.getByLabelText('Street Address'), {target: {value: 'Test Street 123'}});
        fireEvent.change(screen.getByLabelText('City'), {target: {value: 'Test City'}});
        fireEvent.change(screen.getByLabelText('State/Province'), {target: {value: 'Test State'}});
        fireEvent.change(screen.getByLabelText('Postal Code'), {target: {value: '12-345'}});
        fireEvent.change(screen.getByLabelText('Country'), {target: {value: 'Poland'}});
        fireEvent.change(screen.getByLabelText('Phone Number'), {target: {value: '+48123456789'}});

        fireEvent.click(screen.getByText('Register Company'));

        await waitFor(() => expect(screen.getByText('Register Company')).toBeInTheDocument());
    });

    test('handles API error during form submission', async () => {
        const errorMessage = 'Registration failed. Please try again.';
        axios.post = jest.fn().mockRejectedValueOnce({
            response: {
                data: {
                    detail: errorMessage
                }
            }
        });

        render(<CompanyRegister/>, {wrapper: MemoryRouter});

        fireEvent.click(screen.getByRole('button', {name: /register company/i}));

        await waitFor(() => {
            expect(showErrorToast).toHaveBeenCalledWith(errorMessage);
        });
    });
});
