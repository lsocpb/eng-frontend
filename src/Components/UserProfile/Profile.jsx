import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext/UserContext";
import ProfileCharts from "../Charts/ProfileCharts";
import ProfileDetails from "./ProfileDetails";
import ProfileImage from "./ProfileImage";
import SocialLinks from "./SocialLinks";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {BASE_API_URL} from "../../api/config";
import Cookies from "js-cookie";

/**
 * ProfilePage component
 * @function ProfilePage
 * @returns {JSX.Element} The rendered ProfilePage component
 */
export default function ProfilePage() {
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();
    const { logout } = useUser();
    const [billingData, setBillingData] = useState(null);

    /**
     * Effect hook to fetch profile data on component mount
     */
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/user/me`, {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('active-user')}`
                    }
                });
                setProfileData(response.data);
                setBillingData(response.data.billing);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchProfileData();
    }, []);

    /**
     * Handler for successful image upload
     * @function
     * @param {string} imageUrl - URL of the uploaded image
     */
    const handleUploadSuccess = (imageUrl) => {
        setProfileData(prevData => ({
            ...prevData,
            profile_image_url: imageUrl
        }));
    };

    if (!profileData) {
        return <LoadingSpinner />;
    }

    return (
        <section style={{ backgroundColor: '#ffffff' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol lg="4" className="flex-grow-1">
                        <ProfileImage
                            imageUrl={profileData.profile_image_url}
                            username={profileData.username}
                            city={billingData.city}
                            role={profileData.role}
                            onUploadSuccess={handleUploadSuccess}
                            onLogout={logout}
                            onAdminNavigate={() => navigate('/admin')}
                        />
                    </MDBCol>
                    <MDBCol lg="8" className="flex-grow-1">
                        <ProfileDetails
                            username={profileData.username}
                            email={profileData.email}
                            address={billingData.address}
                            city={billingData.city}
                            postalCode={billingData.postal_code}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
