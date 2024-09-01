import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage} from "mdb-react-ui-kit";
import ImageUpload from "../Utils/ImageUpload";

/**
 * Component to display and manage the user's profile image with additional profile details and actions.
 *
 * @param {Object} props - The component props.
 * @param {string} props.imageUrl - The URL of the user's profile image.
 * @param {string} props.username - The full name of the user.
 * @param {string} props.city - The city where the user lives.
 * @param {string} props.role - The role of the user (e.g., 'admin').
 * @param {function} props.onUploadSuccess - Callback function to handle successful image upload.
 * @param {function} props.onLogout - Callback function to handle user logout.
 * @param {function} props.onAdminNavigate - Callback function to navigate to the admin page.
 *
 * @returns {JSX.Element} A card displaying the user's profile image and additional actions.
 */
const ProfileImage = ({ imageUrl, username, city, role, onUploadSuccess, onLogout, onAdminNavigate }) => (
  <MDBCard className="mb-4" style={{backgroundColor: '#FBF4F5'}}>
    <MDBCardBody className="text-center">
      <MDBCardImage
        src={imageUrl || 'https://via.placeholder.com/150x150'}
        alt="avatar"
        className="rounded-circle"
        style={{width: '150px'}}
        fluid
      />
      <ImageUpload onUploadSuccess={onUploadSuccess} />
      <p className="text-black mt-2 mb-1">{username}</p>
      <p className="text-black mb-4">{city}, Poland</p>
      <div className="d-flex align-items-center justify-content-center">
        {role === 'admin' && (
          <MDBBtn color="danger" onClick={onAdminNavigate}>
            Admin Page
          </MDBBtn>
        )}
        <MDBBtn className="btn-outline-danger mx-2" onClick={onLogout}>
          Logout
        </MDBBtn>
      </div>
    </MDBCardBody>
  </MDBCard>
);

export default ProfileImage;