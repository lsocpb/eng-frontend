import React, {useState, useEffect} from "react";
import axios from "axios";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBIcon,
    MDBSpinner,
} from "mdb-react-ui-kit";
import {useParams} from "react-router-dom";
import {BASE_API_URL} from "../../api/config";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const AuctionReport = () => {
    const {auctionId} = useParams();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(
                    `${BASE_API_URL}/auction/stats/${auctionId}`
                );
                setStats(response.data);
            } catch (err) {
                setError("Failed to fetch auction statistics");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [auctionId]);

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return (
            <MDBContainer className="text-center mt-5">
                <h2 className="text-danger">{error}</h2>
            </MDBContainer>
        );
    }

    const StatCard = ({title, value, icon}) => (
        <MDBCol md="6" lg="3" className="mb-4">
            <MDBCard className="h-100 shadow-6-strong">
                <MDBCardBody className="text-center">
                    <MDBIcon
                        fas
                        icon={icon}
                        size="2x"
                        className="text-danger mb-3"
                    />
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText className="h2 text-danger">{value}</MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    );

    return (
        <MDBContainer className="my-5">
            <MDBRow className="justify-content-center mb-5">
                <MDBCol md="10" lg="8" className="text-center">
                    <h1 className="display-4 text-danger font-weight-bold mb-4">
                        Auction Report
                    </h1>
                    <p className="lead text-muted">
                        View detailed statistics for the auction!
                    </p>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <StatCard
                    title="Total Participants"
                    value={stats.participants_count}
                    icon="users"
                />
                <StatCard
                    title="Total Bids"
                    value={stats.total_bids}
                    icon="gavel"
                />
                <StatCard
                    title="Highest Bid"
                    value={`$${stats.highest_bid.toFixed(2)}`}
                    icon="arrow-up"
                />
                <StatCard
                    title="Lowest Bid"
                    value={`$${stats.lowest_bid.toFixed(2)}`}
                    icon="arrow-down"
                />
            </MDBRow>
        </MDBContainer>
    );
};

export default AuctionReport;