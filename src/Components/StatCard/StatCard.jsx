import {MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon} from "mdb-react-ui-kit";
import {Line} from "react-chartjs-2";
import React from "react";

/**
 * Options for the chart displayed in the stat card.
 */
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
/**
 * Component to display a stat card with a chart.
 * @param {title} props - The title of the stat card.
 * @param {value} props - The value to display in the stat card.
 * @param {change} props - The change in value to display in the stat card.
 * @param {icon} props - The icon to display in the stat card.
 * @param {color} props - The color of the icon and chart in the stat card.
 * @param {chartData} props - The data for the chart in the stat card.
 * @returns {JSX.Element} A card displaying a stat with a chart.
 */
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
export default StatCard;