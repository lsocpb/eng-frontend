import React from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
} from 'mdb-react-ui-kit';
import { useScreenSize } from '../../hooks/useScreenSize';
import { WidthBreakpoints } from '../../constans/WidthBreakpoints';

export default function AboutUs() {
    const { screenWidth } = useScreenSize();

    return (
        <MDBContainer>
            <MDBContainer fluid className="py-5 text-center">
                {/* Intro Section */}
                <MDBRow className="justify-content-center">
                    <MDBCol md="10" lg="8">
                        <h1 className="display-4 text-danger font-weight-bold mb-4">
                            What we do
                        </h1>
                        <p className="lead text-muted mb-5">
                            CharFair is an online auction platform that connects charities and donors to raise funds for
                            meaningful causes. Our mission is to make a positive impact in communities worldwide.
                            <img
                                src="https://img.freepik.com/premium-vector/donation-box-with-clothes-toys-books-medicines-african-volunteer-woman-holding-hands-heart-share-your-love-support-poor-people-children-vector-illustration-flat-cartoon-style_189033-1933.jpg?semt=ais_hybrid"
                                alt="Donation Box"
                                className="img-fluid w-100 mb-5"
                                style={{borderRadius: '5px'}}
                            />
                        </p>
                    </MDBCol>
                </MDBRow>

                <MDBRow className="justify-content-center">
                    <MDBCol md="6" className="mb-4">
                        <h2 className="text-danger mb-4">Meet Our Team</h2>
                    </MDBCol>
                </MDBRow>

                <MDBRow className="justify-content-center">
                    <MDBCol md="4" className="mb-4">
                        <MDBCard className="border-0 shadow-sm h-100 text-center">
                            <MDBCardBody className="p-4">
                                <div className="rounded-circle mx-auto mb-3" style={{ width: '100px', height: '100px', backgroundColor: '#f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MDBIcon fas icon="code" size="2x" className="text-danger" />
                                </div>
                                <h5 className="font-weight-bold mb-1">Mateusz</h5>
                                <p className="text-danger mb-2">Backend Engineer</p>
                                <p className="text-muted small mb-3">
                                    Specializing in robust backend architectures and API development. Passionate about creating scalable and secure systems.
                                </p>
                                <div className="d-flex justify-content-center gap-3">
                                    <MDBIcon fas icon="database" className="text-danger" />
                                    <MDBIcon fab icon="python" className="text-danger" />
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4" className="mb-4">
                        <MDBCard className="border-0 shadow-sm h-100 text-center">
                            <MDBCardBody className="p-4">
                                <div className="rounded-circle mx-auto mb-3" style={{ width: '100px', height: '100px', backgroundColor: '#f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MDBIcon fas icon="laptop-code" size="2x" className="text-danger" />
                                </div>
                                <h5 className="font-weight-bold mb-1">Łukasz</h5>
                                <p className="text-danger mb-2">Fullstack Engineer</p>
                                <p className="text-muted small mb-3">
                                    Expert in both frontend and backend development. Focused on creating seamless user experiences and efficient systems.
                                </p>
                                <div className="d-flex justify-content-center gap-3">
                                    <MDBIcon fab icon="react" className="text-danger" />
                                    <MDBIcon fab icon="python" className="text-danger" />
                                    <MDBIcon fab icon="js" className="text-danger" />
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </MDBContainer>
    );
}