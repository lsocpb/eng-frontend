import { render, screen, fireEvent } from '@testing-library/react';
import NotificationDropdown from '../NotificationDropdown';
import { socketService } from '../../../services/socketService';
import Cookies from 'js-cookie';

jest.mock('js-cookie');
jest.mock('../../../services/socketService');

beforeEach(() => {
  Cookies.get.mockReturnValue('mock-token');
  socketService.connect.mockClear();
  socketService.addListener.mockClear();
  socketService.removeListener.mockClear();
  socketService.disconnect.mockClear();
});


it('renders notification icon without unread count when all notifications are read', () => {
  localStorage.setItem('notifications', JSON.stringify([{ id: 1, isRead: true }]));
  render(<NotificationDropdown />);
  expect(screen.queryByText('1')).not.toBeInTheDocument();
});

it('connects to socket service on mount', () => {
  render(<NotificationDropdown />);
  expect(socketService.connect).toHaveBeenCalledWith('mock-token');
});

it('disconnects from socket service on unmount', () => {
  const { unmount } = render(<NotificationDropdown />);
  unmount();
  expect(socketService.disconnect).toHaveBeenCalled();
});