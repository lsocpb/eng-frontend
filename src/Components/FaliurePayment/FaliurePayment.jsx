import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";

/**
 * Component to display a failure message after a payment has failed to process.
 * @returns {JSX.Element} A card containing a failure message and options to retry payment or return to bidding.
 */
const FailurePayment = () => {
  return (
    <MDBContainer>
      <MDBRow className="justify-content-center py-3">
        <MDBCol md="8" lg="6">
          <MDBCard>
            <MDBCardBody className="p-5">
              <div className="text-center mb-5">
                <MDBIcon
                  fas
                  icon="times-circle"
                  size="3x"
                  className="text-danger mb-3"
                />
                <MDBTypography tag="h3" className="mb-2">
                  Payment Failed
                </MDBTypography>
                <p className="text-muted">
                  We couldn't process your payment. Please try again.
                </p>
              </div>

              <div className="bg-light p-4 rounded mb-4">
                <div className="text-center">
                  <MDBIcon fas icon="exclamation-triangle" className="text-danger me-2" />
                  <p className="mb-0">
                    Common reasons for failure:
                  </p>
                  <ul className="text-start text-muted mt-2 small">
                    <li>Insufficient funds</li>
                    <li>Invalid card details</li>
                    <li>Transaction declined by bank</li>
                    <li>Network connection issues</li>
                  </ul>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FailurePayment;