import React, {useCallback, useEffect, useState} from 'react';
import {
    MDBBadge,
    MDBBtn,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon,
    MDBNavbarItem,
} from 'mdb-react-ui-kit';
import "./Notifications.css";
import NotificationItem from './NotificationItem';
import {socketService} from "../../services/socketService";
import Cookies from "js-cookie";
import {STORAGE_KEY} from "../../constans/applicationStorageConstans";

/**
 * Component that displays a dropdown with notifications.
 * @component
 * @returns {JSX.Element} - Rendered NotificationDropdown component
 */
const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem(STORAGE_KEY);
    return savedNotifications ? JSON.parse(savedNotifications) : [
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const token = Cookies.get("active-user");
    if (!token) return;

    socketService.connect(token);

    /**
     * Function to handle new notifications received from the socket
     * @param {Array} data 
     */
    const handleNewNotification = (data) => {
      setNotifications(prev => {
        const newNotification = {
          id: Date.now(),
          title: data.title || 'New Notification',
          message: data,
          time: new Date().toLocaleTimeString(),
          isRead: false,
          icon: data.icon || 'bell',
          iconColor: "text-primary"
        };
        return [newNotification, ...prev].slice(0, 50);
      });
    };

    socketService.addListener("notification", handleNewNotification);

    return () => {
      socketService.removeListener("notification", handleNewNotification);
      socketService.disconnect();
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  /**
   * Function to mark a notification as read
   */
  const handleMarkAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  }, []);

  /**
   * Function to mark all notifications as read
   */
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  return (
    <MDBNavbarItem>
      <MDBDropdown>
        <MDBDropdownToggle tag='a' className='nav-link text-dark position-relative no-caret'>
          <MDBIcon fas icon="bell" size="lg" className="me-2 mx-2"/>
          {unreadCount > 0 && (
            <MDBBadge
              color="danger"
              notification
              pill
              className="position-absolute translate-middle"
            >
              {unreadCount}
            </MDBBadge>
          )}
        </MDBDropdownToggle>

        <MDBDropdownMenu
          className="shadow-lg p-0"
          style={{
            minWidth: '350px',
            maxHeight: '500px',
            overflowY: 'auto'
          }}
        >
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <h6 className="mb-0">Notifications</h6>
            {unreadCount > 0 && (
              <MDBBtn
                color="link"
                size="sm"
                className="text-primary"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </MDBBtn>
            )}
          </div>

          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
            ) : (
              <div className="text-center p-4 text-muted">
                <MDBIcon fas icon="bell-slash" size="3x" className="mb-3"/>
                <p>You dont have new notifications</p>
              </div>
            )}
          </div>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBNavbarItem>
  );
};

export default NotificationDropdown;