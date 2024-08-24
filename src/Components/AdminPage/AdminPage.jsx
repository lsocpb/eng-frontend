import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
} from "mdb-react-ui-kit";
import {Line, Doughnut, Bar} from 'react-chartjs-2';
import 'chart.js/auto';

function AdminPage() {
    const lineChartData = {
        labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze'],
        datasets: [
            {
                label: 'Unique users',
                data: [1000, 1200, 1100, 1300, 1400, 1200],
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            },
            {
                label: 'Visit users',
                data: [1500, 1700, 1600, 1800, 2000, 1900],
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1
            },
            {
                label: 'New users',
                data: [500, 600, 550, 700, 750, 680],
                borderColor: 'rgba(255, 206, 86, 1)',
                tension: 0.1
            },
            {
                label: 'Page Views',
                data: [3000, 3500, 3200, 3800, 4000, 3700],
                borderColor: 'rgba(54, 162, 235, 1)',
                tension: 0.1
            }
        ]
    };

    const generateChartData = (data) => ({
        labels: ['', '', '', '', '', '', ''],
        datasets: [{
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
        }]
    });

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
    };

    const StatCard = ({title, value, change, icon, color, chartData}) => (
        <MDBCol lg={3} md={6} className="mb-4">
            <MDBCard className="h-100">
                <MDBCardBody>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <MDBIcon fas icon={icon} size="2x" style={{color: color}}/>
                        <div style={{height: '50px', width: '100px'}}>
                            <Line data={chartData} options={chartOptions}/>
                        </div>
                    </div>
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <div className="d-flex justify-content-between align-items-end">
                        <MDBCardText className="display-6 mb-0">{value}</MDBCardText>
                        <div className={`text-${change >= 0 ? 'success' : 'danger'} d-flex align-items-center`}>
                            <MDBIcon fas icon={change >= 0 ? 'arrow-up' : 'arrow-down'} className="me-1"/>
                            <span>{Math.abs(change)}%</span>
                        </div>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    );

    const footerData = [
        {label: 'Visits', value: '29,703', percentage: '40%', color: '#4CAF50'},
        {label: 'Unique', value: '24,093', percentage: '20%', color: '#2196F3'},
        {label: 'Pageviews', value: '78,706', percentage: '60%', color: '#FFC107'},
        {label: 'New Users', value: '22,123', percentage: '80%', color: '#F44336'}
    ];

    const RecentActivities = () => (
        <MDBCard className="mb-4">
            <MDBCardBody>
                <MDBCardTitle>Recent Activities</MDBCardTitle>
                <ul className="list-unstyled">
                    {[
                        {action: "New user registered", time: "5 minutes ago", icon: "user-plus"},
                        {action: "New auction created", time: "1 hour ago", icon: "gavel"},
                        {action: "Bid placed on Item #1234", time: "2 hours ago", icon: "hand-holding-usd"},
                        {action: "Auction #5678 completed", time: "1 day ago", icon: "check-circle"},
                    ].map((activity, index) => (
                        <li key={index} className="mb-2">
                            <MDBIcon fas icon={activity.icon} className="me-2"/>
                            {activity.action} <small className="text-muted">- {activity.time}</small>
                        </li>
                    ))}
                </ul>
            </MDBCardBody>
        </MDBCard>
    );

    const CategoryDistribution = () => {
        const data = {
            labels: ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Other'],
            datasets: [
                {
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                },
            ],
        };

        return (
            <MDBCard className="mb-4">
                <MDBCardBody>
                    <MDBCardTitle>Auction Categories Distribution</MDBCardTitle>
                    <Doughnut data={data} options={{responsive: true, maintainAspectRatio: false}}/>
                </MDBCardBody>
            </MDBCard>
        );
    };

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

    return (
        <MDBContainer className="py-5" style={{backgroundColor: '#f8f9fa'}}>
            <h2 className="text-center mb-5" style={{color: '#4a4a4a'}}>Site statistic</h2>
            <MDBRow className="mb-4">
                <StatCard
                    title="Users"
                    value="1,200"
                    change={-12.43}
                    icon="users"
                    color="#FF6384"
                    chartData={generateChartData([1000, 1100, 1050, 1200, 1150, 1250, 1200])}
                />
                <StatCard
                    title="Auctions"
                    value="450"
                    change={5.26}
                    icon="gavel"
                    color="#36A2EB"
                    chartData={generateChartData([400, 420, 430, 425, 440, 445, 450])}
                />
                <StatCard
                    title="Bids"
                    value="3,000"
                    change={-3.15}
                    icon="hand-holding-usd"
                    color="#FFCE56"
                    chartData={generateChartData([2800, 2900, 3100, 3050, 3200, 3100, 3000])}
                />
                <StatCard
                    title="Cash collected"
                    value="166,000$"
                    change={8.72}
                    icon="chart-line"
                    color="#4BC0C0"
                    chartData={generateChartData([150000, 155000, 158000, 160000, 163000, 165000, 166000])}
                />
            </MDBRow>
            <MDBRow className="mb-4">
                <MDBCol md={8}>
                    <MDBCard className="h-auto">
                        <MDBCardBody>
                            <MDBCardTitle>Traffic</MDBCardTitle>
                            <MDBCardText className="text-muted">January - Now</MDBCardText>
                            <Line
                                data={lineChartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                        title: {
                                            display: true,
                                            text: 'User Traffic',
                                            font: {
                                                size: 18
                                            }
                                        }
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            title: {
                                                display: true,
                                                text: 'Number of users',
                                                font: {
                                                    size: 14
                                                }
                                            }
                                        },
                                        x: {
                                            title: {
                                                display: true,
                                                text: 'Month',
                                                font: {
                                                    size: 14
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                            <hr/>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                {footerData.map((item, index) => (
                                    <div key={index} className="text-center ms-4" style={{flex: 1}}>
                                        <div>{item.label}</div>
                                        <div className="font-weight-bold">{item.value} Users
                                            ({item.percentage})
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            height: '4px',
                                            backgroundColor: item.color,
                                            marginTop: '5px'
                                        }}></div>
                                    </div>
                                ))}
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md={4}>
                    <RecentActivities/>
                    <TopUsers/>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md={12}>
                    <MDBRow>
                        <MDBCol md={4}>
                            <MDBCard className="bg-primary text-white">
                                <MDBCardBody className="text-center">
                                    <MDBIcon fab icon="facebook" size="3x" className="mb-3"/>
                                    <MDBCardTitle>Facebook</MDBCardTitle>
                                    <MDBCardText>300 shares</MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md={4}>
                            <MDBCard className="bg-info text-white">
                                <MDBCardBody className="text-center">
                                    <MDBIcon fab icon="twitter" size="3x" className="mb-3"/>
                                    <MDBCardTitle>Twitter</MDBCardTitle>
                                    <MDBCardText>150 retweets</MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md={4}>
                            <MDBCard style={{backgroundColor: '#E1306C'}} className="text-white">
                                <MDBCardBody className="text-center">
                                    <MDBIcon fab icon="instagram" size="3x" className="mb-3"/>
                                    <MDBCardTitle>Instagram</MDBCardTitle>
                                    <MDBCardText>200 likes</MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default AdminPage;