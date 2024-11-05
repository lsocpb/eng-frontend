import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegistrationConfirmation from '../RegistrationConfirmation';

describe('RegistrationConfirmation Component', () => {
    /**
     * Test if the `RegistrationConfirmation` component renders correctly.
     */
    test('renders RegistrationConfirmation component', () => {
        render(<RegistrationConfirmation onClose={() => {}} />);

        expect(screen.getByText('Thank you for registering your company!')).toBeInTheDocument();
        expect(screen.getByText(/Your application has been received and is currently being reviewed/)).toBeInTheDocument();
        expect(screen.getByText(/The verification process should not take longer than/)).toBeInTheDocument();
        expect(screen.getByText(/Once your account has been successfully verified/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /I understand/i })).toBeInTheDocument();
    });

    /**
     * Test if the `onClose` function is called and the user is redirected to /login when the button is clicked.
     */
    test('calls onClose and redirects to /login when "I understand" button is clicked', () => {
        const onCloseMock = jest.fn();

        render(<RegistrationConfirmation onClose={onCloseMock} />);

        const understandButton = screen.getByRole('button', { name: /I understand/i });

        delete window.location;
        window.location = { href: '' };

        fireEvent.click(understandButton);

        expect(onCloseMock).toHaveBeenCalled();

        expect(window.location.href).toBe('/login');
    });
});
