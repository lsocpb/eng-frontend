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

/**
 * ProfilePage component
 * @function ProfilePage
 * @returns {JSX.Element} The rendered ProfilePage component
 */
export default function ProfilePage() {
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();
    const { logout } = useUser();

    /**
     * Effect hook to fetch profile data on component mount
     */
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
                    <MDBCol lg="4">
                        <ProfileImage
                            imageUrl={profileData.profile_image_url}
                            username={profileData.username}
                            city={profileData.address.city}
                            role={profileData.role}
                            onUploadSuccess={handleUploadSuccess}
                            onLogout={logout}
                            onAdminNavigate={() => navigate('/admin')}
                        />
                        <SocialLinks />
                    </MDBCol>
                    <MDBCol lg="8">
                        <ProfileDetails
                            username={profileData.username}
                            email={profileData.email}
                            address={profileData.address}
                        />
                        <MDBRow>
                            <ProfileCharts />
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
