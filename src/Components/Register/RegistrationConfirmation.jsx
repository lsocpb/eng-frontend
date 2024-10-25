import React from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBIcon,
} from 'mdb-react-ui-kit';

/**
 * RegistrationConfirmation component displays a confirmation message to the user.
 * @param onClose {function} - Function to close the modal
 * @returns {Element} - Rendered RegistrationConfirmation component
 */
const RegistrationConfirmation = ({ onClose }) => {
    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <MDBContainer className="px-4" style={{ maxWidth: '600px' }}>
                <MDBCard className="border-0 shadow-lg">
                    <MDBCardBody className="text-center p-5">
                        <div className="mb-4">
                            <MDBIcon far icon="clock" size='3x' className="text-danger" />
                        </div>
                        <h4 className="mb-4 fw-bold">Thank you for registering your company!</h4>
                        <div className="mb-4 text-muted">
                            <p className="mb-3">
                                Your application has been received and is currently being reviewed by our administration team.
                            </p>
                            <p className="mb-3">
                                The verification process should not take longer than <strong>3 business days</strong>.
                            </p>
                            <p>
                                Once your account has been successfully verified, you will receive a confirmation email
                                and will be able to log into the system.
                            </p>
                        </div>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                onClose();
                                window.location.href = "/login";
                            }}
                        >
                            I understand
                        </button>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
};

export default RegistrationConfirmation;