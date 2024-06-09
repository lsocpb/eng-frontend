import React from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import {Chart as ChartJS} from 'chart.js/auto';
import {Bar, Doughnutm, Line} from "react-chartjs-2";

export default function ProfilePage() {
    return (
        <section style={{backgroundColor: '#eee'}}>
            <MDBContainer className="py-5">

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://1000logos.net/wp-content/uploads/2020/09/Allegro-Logo.png"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{width: '150px'}}
                                    fluid/>
                                <p className="text-muted mt-2 mb-1">Allegro sp z.o.o</p>
                                <p className="text-muted mb-4">Warsaw, Poland</p>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody className="p-0">
                                <MDBListGroup flush className="rounded-3">
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fas icon="globe fa-lg text-warning"/>
                                        <MDBCardText>https://allegro.pl</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fab icon="twitter fa-lg" style={{color: '#55acee'}}/>
                                        <MDBCardText>@allegro</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fab icon="instagram fa-lg" style={{color: '#ac2bac'}}/>
                                        <MDBCardText>allegro</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fab icon="facebook fa-lg" style={{color: '#3b5998'}}/>
                                        <MDBCardText>Allegro</MDBCardText>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">Allegro S.A</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">allegro@allegro.com</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">+48 501 100 100</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">Warsaw, Poland</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <Bar
                                            data={{
                                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                                datasets: [
                                                    {
                                                        label: 'Sales',
                                                        data: [12, 19, 3, 5, 2, 3, 10],
                                                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                                        borderColor: 'rgba(54, 162, 235, 1)',
                                                        borderWidth: 2,
                                                        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
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
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <Line
                                            data={{
                                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                                datasets: [
                                                    {
                                                        label: 'Bids',
                                                        data: [12, 19, 3, 5, 2, 3, 10],
                                                        fill: true,
                                                        borderColor: 'rgb(75, 192, 192)',
                                                        tension: 0.3,
                                                        borderWidth: 3,
                                                        pointRadius: 5,
                                                        pointBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                                                        pointBorderColor: 'rgba(75, 192, 192, 1)',
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