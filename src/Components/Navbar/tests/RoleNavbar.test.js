import { render } from '@testing-library/react';
import RoleNavbar from '../RoleNavbar';
import AuthorizedNav from '../AuthorizedNavbar';
import UnauthorizedNav from '../UnAuthorizedNavbar';
import { useUser } from '../../UserContext/UserContext';

jest.mock('../../UserContext/UserContext');
jest.mock('../AuthorizedNavbar');
jest.mock('../UnAuthorizedNavbar');

beforeEach(() => {
  useUser.mockReturnValue({ user: null });
});

it('renders UnauthorizedNav when no user is logged in', () => {
  useUser.mockReturnValue({ user: null });
  render(<RoleNavbar />);
  expect(UnauthorizedNav).toHaveBeenCalled();
});

it('renders AuthorizedNav when a user is logged in', () => {
  useUser.mockReturnValue({ user: { id: 1, name: 'John Doe' } });
  render(<RoleNavbar />);
  expect(AuthorizedNav).toHaveBeenCalled();
});