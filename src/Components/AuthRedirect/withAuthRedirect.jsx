import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthRedirect = (Component) => {
    return (props) => {
        const [isAuthChecked, setIsAuthChecked] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            const token = sessionStorage.getItem('active-user');
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
