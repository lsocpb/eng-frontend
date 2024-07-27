import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBListGroup,
    MDBSpinner,
    MDBListGroupItem, MDBBtn
} from 'mdb-react-ui-kit';
import {Chart as ChartJS} from 'chart.js/auto';
import {Bar, Doughnutm, Line} from "react-chartjs-2";
import ImageUpload from "./ImageUpload";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserContext/UserContext";

export default function ProfilePage() {
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate()
    const { logout } = useUser();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/profile', {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('active-user')}`
                    }
                });
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchProfileData();
    }, []);

    const handleUploadSuccess = (imageUrl) => {
        setProfileData(prevData => ({
            ...prevData,
            profile_image_url: imageUrl
        }));
    };

    if (!profileData) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
            }}>
                <MDBSpinner role='status' color='danger' style={{width: '6rem', height: '6rem'}}>
                    <span className='visually-hidden'>Loading...</span>
                </MDBSpinner>
            </div>
        );
    }

    return (
        <section style={{backgroundColor: '#ffffff'}}>
            <MDBContainer className="py-5">

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4" style={{backgroundColor: '#FBF4F5'}}>
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src={profileData.profile_image_url}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{width: '150px'}}
                                    fluid/>
                                <ImageUpload onUploadSuccess={handleUploadSuccess} />
                                <p className="text-black mt-2 mb-1">{profileData.username}</p>
                                <p className="text-black mb-4">{profileData.address.city}, Poland</p>
                                <div className="d-flex align-items-center justify-content-center">
                                {profileData.role === 'admin' && (
                                    <MDBBtn color="danger" onClick={() => navigate('/admin')}>
                                        Admin Page
                                    </MDBBtn>

                                )}
                                <MDBBtn className="btn-outline-danger mx-2" onClick={logout}>
                                        Logout
                                </MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody className="p-0">
                                <MDBListGroup flush className="rounded-3">
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3"
                                                      style={{backgroundColor: '#FBF4F5'}}>
                                        <MDBIcon fas icon="globe fa-lg text-warning"/>
                                        <MDBCardText>https://allegro.pl</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3"
                                                      style={{backgroundColor: '#FBF4F5'}}>
                                        <MDBIcon fab icon="twitter fa-lg" style={{color: '#55acee'}}/>
                                        <MDBCardText>@allegro</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3"
                                                      style={{backgroundColor: '#FBF4F5'}}>
                                        <MDBIcon fab icon="instagram fa-lg" style={{color: '#ac2bac'}}/>
                                        <MDBCardText>allegro</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3"
                                                      style={{backgroundColor: '#FBF4F5'}}>
                                        <MDBIcon fab icon="facebook fa-lg" style={{color: '#3b5998'}}/>
                                        <MDBCardText>Allegro</MDBCardText>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4" style={{backgroundColor: '#FBF4F5'}}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{profileData.username}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{profileData.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>City</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{profileData.address.city}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText
                                            className="text-muted">{profileData.address.street}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Zip Code</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText
                                            className="text-muted">{profileData.address.zip}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0" style={{backgroundColor: '#FBF4F5'}}>
                                    <MDBCardBody>
                                        <Bar
                                            data={{
                                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                                datasets: [
                                                    {
                                                        label: 'Sales',
                                                        data: [12, 19, 3, 5, 2, 3, 10],
                                                        backgroundColor: '#EC5B62',
                                                        borderColor: '#C94A51',
                                                        borderWidth: 2,
                                                        hoverBackgroundColor: '#C94A51',
                                                    },
                                                ],
                                            }}
                                            height={400}
                                            width={600}
                                            options={{
                                                maintainAspectRatio: false,
                                                scales: {
                                                    x: {
                                                        grid: {
                                                            display: false,
                                                        },
                                                    },
                                                    y: {
                                                        ticks: {
                                                            precision: 0,
                                                            font: {
                                                                size: 14,
                                                            },
                                                        },
                                                        grid: {
                                                            color: 'rgba(0, 0, 0, 0.1)',
                                                        },
                                                    },
                                                },
                                                plugins: {
                                                    legend: {
                                                        labels: {
                                                            font: {
                                                                size: 16,
                                                            },
                                                        },
                                                    },
                                                    title: {
                                                        display: true,
                                                        text: 'Last 6 months sales',
                                                        font: {
                                                            size: 20,
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0" style={{backgroundColor: '#FBF4F5'}}>
                                    <MDBCardBody>
                                        <Line
                                            data={{
                                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                                datasets: [
                                                    {
                                                        label: 'Bids',
                                                        data: [12, 19, 3, 5, 2, 3, 10],
                                                        fill: true,
                                                        borderColor: '#C94A51',
                                                        tension: 0.3,
                                                        borderWidth: 3,
                                                        pointRadius: 5,
                                                        pointBackgroundColor: '#C94A51',
                                                        pointBorderColor: '#C94A51',
                                                        pointHoverRadius: 7,
                                                    },
                                                ],
                                            }}
                                            height={400}
                                            width={600}
                                            options={{
                                                maintainAspectRatio: false,
                                                scales: {
                                                    x: {
                                                        grid: {
                                                            display: false,
                                                        },
                                                    },
                                                    y: {
                                                        ticks: {
                                                            precision: 0,
                                                            font: {
                                                                size: 14,
                                                            },
                                                        },
                                                        grid: {
                                                            color: 'rgba(0, 0, 0, 0.1)',
                                                        },
                                                    },
                                                },
                                                plugins: {
                                                    legend: {
                                                        labels: {
                                                            font: {
                                                                size: 16,
                                                            },
                                                        },
                                                    },
                                                    title: {
                                                        display: true,
                                                        text: 'Last 6 months bids',
                                                        font: {
                                                            size: 20,
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}