// RegisterChoice.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBIcon
} from 'mdb-react-ui-kit';

function RegisterChoice() {
    const navigate = useNavigate();

    return (
        <MDBContainer className="my-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold">Choose Registration Type</h1>
                <p className="text-muted">Select the type of account that best suits your needs</p>
            </div>

            <MDBRow className="justify-content-center">
                <MDBCol md="5">
                    <MDBCard className="h-100 shadow-lg">
                        <MDBCardBody className="d-flex flex-column">
                            <div className="text-center mb-4">
                                <MDBIcon color="danger" fas icon="user-circle" size="3x" className="text-primary mb-3" />
                                <MDBCardTitle tag="h3">Personal Account</MDBCardTitle>
                            </div>

                            <MDBCardText>
                                Perfect for individual users who want to:
                                <ul className="mt-3">
                                    <li>Browse and purchase products</li>
                                    <li>Track orders and history</li>
                                    <li>Save favorites</li>
                                    <li>Receive personal recommendations</li>
                                </ul>
                            </MDBCardText>

                            <div className="mt-auto">
                                <div className="text-center mb-3">
                                    <small className="text-muted">Quick registration with basic information</small>
                                </div>
                                <MDBBtn
                                    color="danger"
                                    className="w-100"
                                    onClick={() => navigate('/register/user')}
                                >
                                    Register Personal Account
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <MDBCol md="5">
                    <MDBCard className="h-100 shadow-lg">
                        <MDBCardBody className="d-flex flex-column">
                            <div className="text-center mb-4">
                                <MDBIcon fas icon="building" size="3x" className="mb-3" style={{
                                    color: '#FFC0CB'
                                }} />
                                <MDBCardTitle tag="h3">Business Account</MDBCardTitle>
                            </div>

                            <MDBCardText>
                                Designed for companies that want to:
                                <ul className="mt-3">
                                    <li>Donate their unique items</li>
                                    <li>Support many charities</li>
                                    <li>Get detailed statistic about their auctions</li>
                                    <li>Get priority support</li>
                                </ul>
                            </MDBCardText>

                            <div className="mt-auto">
                                <div className="text-center mb-3">
                                    <small className="text-muted">Requires company and contact details</small>
                                </div>
                                <MDBBtn
                                    color="outline-danger"
                                    className="w-100"
                                    onClick={() => navigate('/register/company')}
                                >
                                    Register Business Account
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

            <div className="text-center mt-4">
                <p className="text-muted">
                    Already have an account? {' '}
                    <a href="/login" className="text-danger">
                        Log in here
                    </a>
                </p>
            </div>
        </MDBContainer>
    );
}

export default RegisterChoice;