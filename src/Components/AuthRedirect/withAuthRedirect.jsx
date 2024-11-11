import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
/**
 * HOC to redirect to the home page if the user is authenticated
 * @param {Component} Component - The component to be wrapped
 * @returns {JSX.Element} - The wrapped component
 */
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
