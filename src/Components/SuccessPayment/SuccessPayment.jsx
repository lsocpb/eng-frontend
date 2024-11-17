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
 * Component to display a success message after a payment has been processed.
 * @returns {JSX.Element} A card containing a success message and options to navigate back to bidding or view transactions.
 */
const SuccessPayment = () => {
  return (
    <MDBContainer>
      <MDBRow className="justify-content-center py-3">
        <MDBCol md="8" lg="6">
          <MDBCard>
            <MDBCardBody className="p-5">
              <div className="text-center mb-5">
                <MDBIcon
                  fas
                  icon="check-circle"
                  size="3x"
                  className="text-danger mb-3"
                />
                <MDBTypography tag="h3" className="mb-2">
                  Payment Successful!
                </MDBTypography>
                <p className="text-muted">
                  Your funds have been successfully added to your wallet
                </p>
              </div>

              <div className="bg-light p-4 rounded mb-4">
                <div className="text-center">
                  <MDBIcon fas icon="envelope" className="text-danger me-2" />
                  <p className="mb-0">
                    You will receive a confirmation email shortly
                  </p>
                </div>
              </div>

              <div className="d-grid gap-3">
                <MDBBtn
                  block
                  className="btn btn-danger"
                >
                  <MDBIcon fas icon="heart" className="me-2" />
                  Back to bidding!
                </MDBBtn>
                <MDBBtn
                  block
                  className="btn btn-outline-danger"
                >
                  <MDBIcon fas icon="history" className="me-2" />
                  View Transactions
                </MDBBtn>
              </div>

              <div className="text-center mt-4">
                <small className="text-muted">
                  <MDBIcon fas icon="shield-alt" className="me-2" />
                  Transaction processed securely by Stripe
                </small>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SuccessPayment;