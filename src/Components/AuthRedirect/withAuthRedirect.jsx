import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const withAuthRedirect = (Component) => {
    return (props) => {
        const [isAuthChecked, setIsAuthChecked] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            const token = Cookies.get('active-user');
            if (token) {
                navigate('/home');
            } else {
                setIsAuthChecked(true);
            }
        }, [navigate]);

        if (!isAuthChecked) {
            return null;
        }

        return <Component {...props} />;
    };
};

export default withAuthRedirect;
