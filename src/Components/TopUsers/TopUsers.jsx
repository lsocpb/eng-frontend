import {MDBCard, MDBCardBody, MDBCardTitle, MDBIcon} from "mdb-react-ui-kit";
import React from "react";

/**
 * Component to display a list of top users with their number of auctions and bids.
 * @component
 * @returns {JSX.Element} A card containing a list of top users with their auction and bid counts. 
 */
const TopUsers = () => (
        <MDBCard className="mb-4">
            <MDBCardBody>
                <MDBCardTitle>Top Users</MDBCardTitle>
                <ul className="list-unstyled">
                    {[
                        {name: "John Doe", auctions: 15, bids: 45},
                        {name: "Jane Smith", auctions: 12, bids: 38},
                        {name: "Bob Johnson", auctions: 10, bids: 30},
                    ].map((user, index) => (
                        <li key={index} className="mb-2 d-flex justify-content-between align-items-center">
            <span>
              <MDBIcon fas icon="user-circle" className="me-2"/>
                {user.name}
            </span>
                            <span>
              <small className="text-muted me-2">{user.auctions} auctions</small>
              <small className="text-muted">{user.bids} bids</small>
            </span>
                        </li>
                    ))}
                </ul>
            </MDBCardBody>
        </MDBCard>
    );

export default TopUsers;