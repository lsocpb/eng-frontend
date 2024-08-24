import React from 'react';
import {MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow} from "mdb-react-ui-kit";

/**
 * Component to display profile details in a card layout using MDB components.
 *
 * @component
 * @example
 * const username = "John Doe";
 * const email = "johndoe@example.com";
 * const address = { city: "New York", street: "123 Main St", zip: "10001" };
 * return <ProfileDetails username={username} email={email} address={address} />;
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
const ProfileDetails = ({ username, email, address }) => (
  <MDBCard className="mb-4" style={{backgroundColor: '#FBF4F5'}}>
    <MDBCardBody>
      {[
        { label: "Full Name", value: username },
        { label: "Email", value: email },
        { label: "City", value: address.city },
        { label: "Address", value: address.street },
        { label: "Zip Code", value: address.zip }
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
