import React from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
} from 'mdb-react-ui-kit';
import {useScreenSize} from '../../hooks/useScreenSize';
import "./AboutUs.css";

export default function AboutUs() {
    const {screenWidth} = useScreenSize();

    return (
        <MDBContainer>
            <MDBContainer fluid className="py-5 text-center">
                {/* Intro Section */}
                <MDBRow className="justify-content-center">
                    <MDBCol md="10" lg="8">
                        <h1 className="display-4 text-danger font-weight-bold mb-4">
                            What we do
                        </h1>
                        <p className="lead text-muted mb-5 position-relative">
                            CharFair is an online auction platform that connects charities and donors to raise funds for
                            meaningful causes. Our mission is to make a positive impact in communities worldwide.
                            <img
                                src="https://img.freepik.com/premium-vector/donation-box-with-clothes-toys-books-medicines-african-volunteer-woman-holding-hands-heart-share-your-love-support-poor-people-children-vector-illustration-flat-cartoon-style_189033-1933.jpg?semt=ais_hybrid"
                                alt="Donation Box"
                                className="img-fluid shadow-sm mt-4 hover-shadow"
                                style={{
                                    borderRadius: '8px',
                                    maxHeight: '400px',
                                    objectFit: 'cover',
                                    transition: 'all 0.3s ease-in-out'
                                }}
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
                    {[
                        {
                            name: "Mateusz",
                            role: "Backend Engineer",
                            description: "Specializing in robust backend architectures and API development. Passionate about creating scalable and secure systems.",
                            icon: "code",
                            skills: ["database", "python"],
                            linkedin: "https://www.linkedin.com/in/mateusz-polens-381b96273/",
                            github: "https://github.com/Kaspek2480"
                        },
                        {
                            name: "Łukasz",
                            role: "Fullstack Engineer",
                            description: "Expert in both frontend and backend development. Focused on creating seamless user experiences and efficient systems.",
                            icon: "laptop-code",
                            skills: ["react", "python", "js"],
                            linkedin: "https://www.linkedin.com/in/lukasz-socik/",
                            github: "https://github.com/lsocpb"
                        }
                    ].map((member, index) => (
                        <MDBCol md="4" className="mb-4" key={index}>
                            <MDBCard className="border-0 shadow-sm h-100 text-center card-hover position-relative">
                                <MDBCardBody className="p-4">
                                    <div className="rounded-circle mx-auto mb-3"
                                         style={{
                                             width: '100px',
                                             height: '100px',
                                             backgroundColor: '#f1f1f1',
                                             display: 'flex',
                                             alignItems: 'center',
                                             justifyContent: 'center'
                                         }}>
                                        <MDBIcon fas icon={member.icon} size="2x" className="text-danger"/>
                                    </div>
                                    <h5 className="font-weight-bold mb-1">{member.name}</h5>
                                    <p className="text-danger mb-2">{member.role}</p>
                                    <p className="text-muted small mb-3">
                                        {member.description}
                                    </p>
                                    <div className="d-flex justify-content-center gap-3">
                                        {member.skills.map((skill, idx) => (
                                            <MDBIcon key={idx} fab={skill !== "database"} fas={skill === "database"}
                                                     icon={skill} className="text-danger"/>
                                        ))}
                                    </div>
                                    <div className="social-overlay">
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                                           className="social-icon">
                                            <MDBIcon fab icon="linkedin" size="2x"/>
                                        </a>
                                        <a href={member.github} target="_blank" rel="noopener noreferrer"
                                           className="social-icon">
                                            <MDBIcon fab icon="github" size="2x"/>
                                        </a>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                </MDBRow>
            </MDBContainer>
        </MDBContainer>
    );
}