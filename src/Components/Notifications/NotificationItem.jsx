import {
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

/**
 * Notification representing single item component.
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.notification - The notification object
 * @param {Function} props.onMarkAsRead - The function to mark a notification as read
 * @returns {JSX.Element} - The notification item component
 */
const NotificationItem = ({ notification, onMarkAsRead }) => (
  <div
    className="d-flex align-items-start p-3 border-bottom hover-shadow"
    style={{
      backgroundColor: notification.isRead ? "white" : "#f8f9fa",
      cursor: "pointer",
    }}
  >
    <div className="me-3">
      <MDBIcon
        fas
        icon={notification.icon || "bell"}
        size="lg"
        className={`p-2 rounded-circle ${
          notification.iconColor || "text-primary"
        }`}
      />
    </div>
    <div className="flex-grow-1">
      <div className="d-flex justify-content-between">
        <h6 className="mb-1">{notification.title}</h6>
        <small className="text-muted">{notification.time}</small>
      </div>
      <p className="mb-1 text-muted" style={{ fontSize: "0.9rem" }}>
        {notification.message}
      </p>
      {!notification.isRead && (
        <MDBBtn
          size="sm"
          color="light"
          className="mt-1"
          onClick={(e) => {
            e.stopPropagation();
            onMarkAsRead(notification.id);
          }}
        >
          Mark as read
        </MDBBtn>
      )}
    </div>
  </div>
);

export default NotificationItem;
