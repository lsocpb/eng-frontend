import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { useUser } from '../../UserContext/UserContext';

jest.mock('../../UserContext/UserContext');

describe('ProtectedRoute Component', () => {
  it('redirects to login if user is not authenticated', () => {
    useUser.mockReturnValue({ user: null });

    const { container } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/protected" element={<ProtectedRoute />} />
        </Routes>
      </MemoryRouter>
    );

    expect(container.innerHTML).toMatch('Login Page');
  });

  it('renders the outlet if user is authenticated and no roles are required', () => {
    useUser.mockReturnValue({ user: { role: 'user' } });

    const { container } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute />} >
            <Route path="" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(container.innerHTML).toMatch('Protected Content');
  });

  it('redirects to home if user does not have the required role', () => {
    useUser.mockReturnValue({ user: { role: 'user' } });

    const { container } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/home" element={<div>Home Page</div>} />
          <Route path="/protected" element={<ProtectedRoute requiredRoles={['admin']} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(container.innerHTML).toMatch('Home Page');
  });

  it('renders the outlet if user has the required role', () => {
    useUser.mockReturnValue({ user: { role: 'admin' } });

    const { container } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute requiredRoles={['admin']} />} >
            <Route path="" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(container.innerHTML).toMatch('Protected Content');
  });

  it('returns null while user authentication status is being determined', () => {
    useUser.mockReturnValue({ user: undefined });

    const { container } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute />} />
        </Routes>
      </MemoryRouter>
    );

    expect(container.innerHTML).toBe('');
  });
});