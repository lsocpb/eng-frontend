import React, { useState } from 'react';
import {
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBadge,
  MDBBtn,
} from 'mdb-react-ui-kit';
import "./Notifications.css";
import NotificationItem from './NotificationItem';

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nowa darowizna",
      message: "Jan Kowalski przekazał darowiznę w wysokości $50",
      time: "5 min temu",
      isRead: false,
      icon: "heart",
      iconColor: "text-danger"
    },
    {
      id: 2,
      title: "Status zamówienia",
      message: "Twoja darowizna została odebrana przez potrzebującego",
      time: "1 godz temu",
      isRead: false,
      icon: "check-circle",
      iconColor: "text-success"
    },
    {
      id: 3,
      title: "Przypomnienie",
      message: "Uzupełnij swój profil, aby lepiej pomagać innym",
      time: "2 godz temu",
      isRead: true,
      icon: "user",
      iconColor: "text-info"
    },
    {
        id: 4,
        title: "Przypomnienie",
        message: "Uzupełnij swój profil, aby lepiej pomagać innym",
        time: "2 godz temu",
        isRead: true,
        icon: "user",
        iconColor: "text-info"
      }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

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