import React from 'react';
import {MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow} from "mdb-react-ui-kit";

/**
 * Component to display profile details in a card layout using MDB components.
 *
 * @param {Object} props - The component props.
 * @param {string} props.username - The full name of the user.
 * @param {string} props.email - The email address of the user.
 * @param {Object} props.address - The address of the user.
 * @param {string} props.address.city - The city where the user lives.
 * @param {string} props.address.street - The street address of the user.
 * @param {string} props.address.zip - The zip code of the user's address.
 *
 * @returns {JSX.Element} A card displaying the user's profile details.
 */
const ProfileDetails = ({ username, email, city, address, postalCode }) => (
  <MDBCard className="" style={{backgroundColor: '#FBF4F5'}}>
    <MDBCardBody>
      {[
        { label: "Full Name", value: username },
        { label: "Email", value: email },
        { label: "City", value: city },
        { label: "Address", value: address },
        { label: "Zip Code", value: postalCode },
      ].map((item, index) => (
        <React.Fragment key={index}>
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>{item.label}</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">{item.value}</MDBCardText>
            </MDBCol>
          </MDBRow>
          {index < 4 && <hr/>}
        </React.Fragment>
      ))}
    </MDBCardBody>
  </MDBCard>
);

export default ProfileDetails;
