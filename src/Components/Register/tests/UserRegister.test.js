const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const userEvent = require('@testing-library/user-event').default;
require('@testing-library/jest-dom/extend-expect');
const axios = require('axios');
const UserRegister = require('../UserRegister').default;
const { showSuccessToast, showErrorToast } = require('../../ToastNotifications/ToastNotifications');

jest.mock('axios');
jest.mock('../../ToastNotifications/ToastNotifications');
jest.mock('../../AuthRedirect/withAuthRedirect', () => (component) => component);

describe('UserRegister Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders registration form with all required fields', () => {
    render(<UserRegister />);

    // Check for form title
    expect(screen.getByText('Personal Account Registration')).toBeInTheDocument();

    // Check for all form inputs
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/postal code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole('button', { name: /register account/i })).toBeInTheDocument();
  });

  test('displays validation errors for empty required fields', async () => {
    render(<UserRegister />);

    fireEvent.click(screen.getByRole('button', { name: /register account/i }));

    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  test('successfully submits form with valid data', async () => {
    const mockResponse = { data: { message: 'Registration successful' } };
    axios.post = jest.fn().mockReturnValueOnce(mockResponse);

    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    render(<UserRegister />);

    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/first name/i), 'John');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(screen.getByLabelText(/phone/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/address/i), '123 Test St');
    await userEvent.type(screen.getByLabelText(/postal code/i), '12345');
    await userEvent.type(screen.getByLabelText(/city/i), 'Test City');
    await userEvent.type(screen.getByLabelText(/state/i), 'Test State');
    await userEvent.type(screen.getByLabelText(/country/i), 'Test Country');

    fireEvent.click(screen.getByRole('button', { name: /register account/i }));

    const expectedPayload = {
      account_details: {
        username: 'testuser',
        password: 'password123',
        email: 'test@example.com',
      },
      billing_details: {
        first_name: 'John',
        last_name: 'Doe',
        address: '123 Test St',
        postal_code: '12345',
        city: 'Test City',
        state: 'Test State',
        country: 'Test Country',
        phone_number: '1234567890',
      },
    };

    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      expectedPayload,
      expect.any(Object)
    );

    await waitFor(() => {
      expect(showSuccessToast).toHaveBeenCalledWith('Registration successful');
    });

    await waitFor(() => {
      expect(window.location.href).toBe('/login');
    });

    window.location = originalLocation;
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

    render(<UserRegister />);

    // Fill in all required fields
    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/first name/i), 'John');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(screen.getByLabelText(/phone/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/address/i), '123 Test St');
    await userEvent.type(screen.getByLabelText(/postal code/i), '12345');
    await userEvent.type(screen.getByLabelText(/city/i), 'Test City');
    await userEvent.type(screen.getByLabelText(/state/i), 'Test State');
    await userEvent.type(screen.getByLabelText(/country/i), 'Test Country');

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register account/i }));

    await waitFor(() => {
      expect(showErrorToast).toHaveBeenCalledWith(errorMessage);
    });
  });

  test('checks for social media registration options', () => {
    render(<UserRegister />);

    expect(screen.getByText('or sign up with:')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /google/i })).toBeInTheDocument();
  });
});