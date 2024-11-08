import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ContactForm from '../ContactForm';

jest.mock('axios');

describe('ContactForm', () => {
    beforeEach(() => {
        axios.post.mockClear();
    });

    test('renders the contact form', () => {
        render(<ContactForm />);
        expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Your Message/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
    });

    test('submits the form successfully', async () => {
        axios.post.mockResolvedValueOnce({ data: { success: true } });

        render(<ContactForm />);

        fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Your Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Your Message/i), { target: { value: 'Hello, this is a test message.' } });

        fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
        expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/user/send-email'), {
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Hello, this is a test message.',
            to: 'charfaircharity@gmail.com',
        });

        await waitFor(() => expect(screen.getByText(/Message sent successfully!/i)).toBeInTheDocument());
    });

    test('handles form submission error', async () => {
        axios.post.mockRejectedValueOnce(new Error('Error sending email'));

        render(<ContactForm />);

        fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Your Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Your Message/i), { target: { value: 'Hello, this is a test message.' } });

        fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
        expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/user/send-email'), {
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Hello, this is a test message.',
            to: 'charfaircharity@gmail.com',
        });

        await waitFor(() => expect(screen.getByText(/Error sending message. Please try again./i)).toBeInTheDocument());
    });
});