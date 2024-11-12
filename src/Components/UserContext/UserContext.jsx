import { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserContext = createContext(null);

/**
 * Provides user authentication and management context using cookies.
 *
 * The `UserProvider` component manages the user state based on the token stored in
 * a cookie. It decodes the token to retrieve user information and provides
 * the user data and functions to update it or log out through context.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the context.
 *
 * @returns {JSX.Element} The `UserContext.Provider` component with value containing user data and functions.
 */
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('active-user');
        if (token) {
            const decoded = jwtDecode(token);
            setUser({
                username: decoded.sub,
                id: decoded.id,
                role: decoded.role
            });
        } else {
            setUser(null);
        }
    }, []);

    /**
     * Logs out the current user by removing the token cookie,
     * clearing the user state, and navigating to the login page.
     */
    const logout = () => {
        Cookies.remove('active-user');
        setUser(null);
        navigate('/login');
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

/**
 * Custom hook to access the user context.
 *
 * @returns {object} The user context value including user data, setUser function, and logout function.
 */
export const useUser = () => useContext(UserContext);